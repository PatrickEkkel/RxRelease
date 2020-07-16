from .predefined.formulas.postgresql.filler import PostgresFormula

class SaltFiller:

    def createFillerForTest(self):
        postgres = PostgresFormula()
        postgres.create()
