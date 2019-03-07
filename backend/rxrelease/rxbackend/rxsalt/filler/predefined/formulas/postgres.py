from .formula import Formula
from rxbackend.rxsalt.models import SaltFormula
from rxbackend.models import File
from rxbackend.configuration.globalsettings import LocalSettings
from rxbackend.core.io.rxlocalstore import RxLocalStore
class PostgresFormula(Formula):

    def create(self):
        localstore = RxLocalStore.get_or_create_dir_from_localstore('salt-formulas/postgresql')
        # create a saltformula object
        postgres_formula = SaltFormula.objects.create(name='PostgreSQL',status='NONE')
        init_filename = 'init.sls'
        init_filehandle = localstore.new_text_file(init_filename)
        init_file = File.objects.create(filename=init_filename,path=localstore.get_location())
        init_file.save()
        postgres_formula.files.set([init_file])
