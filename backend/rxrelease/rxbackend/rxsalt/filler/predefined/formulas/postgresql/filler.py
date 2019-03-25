from rxbackend.rxsalt.filler.predefined.formulas.formula import Formula
from rxbackend.rxsalt.models import SaltFormula
from rxbackend.models import File
from rxbackend.configuration.globalsettings import LocalSettings
from rxbackend.core.io.rxlocalstore import RxLocalStore
class PostgresFormula(Formula):

    def create(self):
        formula_name = 'PostgreSQL'
        localstore = RxLocalStore.get_or_create_dir_from_localstore('salt-formulas/' + formula_name)
        # create a saltformula object
        postgres_formula = SaltFormula.objects.create(name=formula_name,status='NONE')
        init_filename = 'init.sls'
        init_filehandle = localstore.new_text_file(init_filename)
        init_file = File.objects.create(filename=init_filename,path=localstore.get_current_context())
        init_file.save()
        postgres_formula.files.set([init_file])
