import ntpath
from rxbackend.rxsalt.filler.predefined.formulas.formula import Formula
from rxbackend.rxsalt.models import SaltFormula
from rxbackend.models import File
from rxbackend.configuration.globalsettings import LocalSettings
from rxbackend.core.io.rxlocalstore import RxLocalStore


class PostgresFormula(Formula):

    @staticmethod
    def create():
        formula_name = 'PostgreSQL'
        localstore = RxLocalStore.get_or_create_dir_from_localstore('salt-formulas/' + formula_name)
        # create a saltformula object
        postgres_formula = SaltFormula.objects.create(name=formula_name, status='NONE')
        init_filename = 'init.sls'
        service_filename = 'postgresql.service'

        init_filehandle = localstore.new_text_file(init_filename)
        service_filehandle = localstore.new_text_file(service_filename)

        init_file = File.objects.create(filename=init_filename, path=localstore.get_current_context())
        init_file.save()
        head, tail = ntpath.split(__file__)

        predef_init = head + '/formula/init.sls'
        predef_postgresql = head + '/formula/postgresql.service'

        predef_init_filehandle = open(predef_init, 'r')
        predef_postgresql_filehandle = open(predef_postgresql, 'r')

        for line in predef_init_filehandle.readlines():
            init_filehandle.write(line)
        for line in predef_postgresql_filehandle.readlines():
            service_filehandle.write(line)

        # init_filehandle.write(''.join(predef_init_filehandle.readlines()))
        # get the file from the predefined directory

        # postgres_formula.files.set([init_file])
