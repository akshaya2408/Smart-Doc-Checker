# Very simple billing/usage tracker
class BillingTracker:
    def __init__(self):
        self.docs_analyzed = 0
        self.reports_generated = 0
        self.doc_rate = 1.0   # $1 per doc
        self.report_rate = 2.0 # $2 per report

    def add_docs(self, n):
        self.docs_analyzed += n

    def add_report(self):
        self.reports_generated += 1

    def total_bill(self):
        return self.docs_analyzed*self.doc_rate + self.reports_generated*self.report_rate

billing = BillingTracker()
