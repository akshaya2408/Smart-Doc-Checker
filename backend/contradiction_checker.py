import re

def normalize_time(t):
    """Convert '10:00 PM' → '22:00' for easy comparison"""
    match = re.match(r"(\d{1,2})(?::(\d{2}))?\s?(am|pm)", t.lower())
    if not match:
        return t.upper()
    hour = int(match.group(1))
    minute = int(match.group(2) or 0)
    ampm = match.group(3)
    if ampm == "pm" and hour != 12:
        hour += 12
    if ampm == "am" and hour == 12:
        hour = 0
    return f"{hour:02}:{minute:02}"

def extract_facts(text):
    text_lower = text.lower()
    facts = {}

    # Submission deadline
    time_match = re.search(r"(?:before|by)\s+(\d{1,2}(?::\d{2})?\s?(?:am|pm))", text_lower)
    if time_match:
        facts["submission_time"] = normalize_time(time_match.group(1))

    # Work-from-home policy
    wfh_match = re.search(r"work[- ]?from[- ]?home.*?(\d+)\s+days\s+per\s+month", text_lower)
    if wfh_match:
        facts["work_from_home_days"] = wfh_match.group(1)

    # Notice period
    notice_match = re.search(r"(\d+)\s*(?:-day|days)\s+notice", text_lower)
    if notice_match:
        facts["notice_period_days"] = notice_match.group(1)
    else:
        month_match = re.search(r"(\d+)\s*month", text_lower)
        if month_match:
            facts["notice_period_days"] = str(int(month_match.group(1)) * 30)

    # Training window
    train_match = re.search(r"(?:within|completion window is)\s+(\d+)\s+days", text_lower)
    if train_match:
        facts["training_days"] = train_match.group(1)

    # Overtime threshold
    overtime_match = re.search(r"after\s+(\d+)\s*hours/week", text_lower)
    if overtime_match:
        facts["overtime_hours"] = overtime_match.group(1)

    # Attendance
    att_match = re.search(r"(?:minimum|required|at least|must maintain).*?(\d{2,3})%", text_lower)
    if att_match:
        facts["attendance_percent"] = att_match.group(1)

    # Budget approval (₹ amounts)
    budget_match = re.search(r"₹\s?([\d,]+)", text_lower)
    if budget_match:
        facts["budget_limit"] = budget_match.group(1).replace(",", "")

    # Project duration (in months)
    duration_match = re.search(r"(?:not exceed|up to)\s+(\d+)\s+months", text_lower)
    if duration_match:
        facts["project_duration_months"] = duration_match.group(1)

    return facts


def find_conflicts(docs):
    all_facts = [extract_facts(doc) for doc in docs]
    conflicts = []
    for i in range(len(all_facts)):
        for j in range(i+1, len(all_facts)):
            f1, f2 = all_facts[i], all_facts[j]
            for key in set(f1.keys()) & set(f2.keys()):
                if f1[key] != f2[key]:
                    conflicts.append({
                        "field": key,
                        "docA": f1[key],
                        "docB": f2[key],
                        "message": f"Conflict in {key}: Doc{i+1} says {f1[key]}, Doc{j+1} says {f2[key]}"
                    })
    return conflicts
