from .predefined.formulas.postgres import PostgresFormula


class SaltFiller:

    def createFillerForTest(self):
        postgres = PostgresFormula()
        postgres.create()
