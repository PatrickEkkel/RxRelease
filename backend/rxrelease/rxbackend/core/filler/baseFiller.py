from django.contrib.auth.models import User

from .profileFiller import ProfileFiller
from ...configuration.globalsettings import ApiUserSettings
from ...models import StateType
from ...models import SettingsCategory
from ...models import Capability
from ...models import ProfileType
from ...models import Profile
from ...models import Configuration
from ...models import KVSetting
from ...models import Module


class BaseFiller:

    def __init__(self):
        pass

    def createBaseFillForSalt(self):
        # 2 superusers aanmaken met de standaard BaseFiller
        User.objects.create_superuser(username='superuser', password='changeit', email='')
        User.objects.create_superuser(username=ApiUserSettings.username,
                                      password=ApiUserSettings.password, email='')

        # Dit is hoe token authentication werkt voor als we willen weten hoe we een nieuwe user willen maken of willen weten hoe het zaakje geconfigureerd
        # http://cheng.logdown.com/posts/2015/10/27/how-to-use-django-rest-frameworks-token-based-authentication

        salt_module = Module.objects.create(name="rxsalt", active=False, menuoptionname="Salt",
                                            configurationPanel="SALT_CONFIGURATION_PANEL")
        salt_module.save()

        # Built in profiletypes
        buildin_default_rxrelease_profiletype = ProfileType.objects.create(name="Default")
        buildin_default_profile = Profile.objects.create(name="Default")
        buildin_default_profile.profiletype = buildin_default_rxrelease_profiletype
        buildin_default_configuration = Configuration.objects.create(name="Default Configuration",
                                                                     profile=buildin_default_profile)

        buildin_saltmaster_profiletype = ProfileType.objects.create(name="Salt Master")
        buildin_saltmaster_profile = Profile.objects.create(name="RxRelease Salt Master")
        buildin_saltmaster_profile.profiletype = buildin_saltmaster_profiletype
        buildin_saltmaster_configuration = Configuration.objects.create(
            name="Salt master default Configuration", profile=buildin_saltmaster_profile)
        # buildin_saltmaster_configuration.profile = buildin_saltmaster_profile

        # Salt settings category maken
        salt_settings_category = SettingsCategory.objects.create(name="Salt Settings",
                                                                 prefix="salt")
        salt_settings_category.save()

        # Settings category maken
        global_category = SettingsCategory.objects.create(name="Global Settings")


        salt_accept_master_category = SettingsCategory.objects.create(name="Salt Accept Master")

        kvsettting_testflag = KVSetting.objects.create(key='test',value='False',category=salt_accept_master_category)
        kvsetting_apimode = KVSetting.objects.create(key='api-mode',value='PRODUCTION',category=salt_accept_master_category)
        kvsetting_saltfunction = KVSetting.objects.create(key='salt-function',value='ACCEPTMINION',category=salt_accept_master_category)
        # Standard settings applyen
        kvsetting_sshport = KVSetting.objects.create(key='sshport', value='2222',
                                                     category=global_category)
        kvsetting_os = KVSetting.objects.create(key="os", value="CentOS", category=global_category)

        kvsetting_saltapiport = KVSetting.objects.create(key='saltapiport', value='8888',
                                                         category=global_category)
        kvsetting_saltapiport.save()
        # TODO: split the "base stuff" from the "salt stuff"

        # De verschillende basis states maken
        passwordless_login_state = StateType.objects.create(name="SSH passwordless login"
                                                            , handler="passwordless-sshlogin.py"
                                                            , state_settings=global_category
                                                            , module="default"
                                                            , jobtype="SIMPLE_STATE")

        prerequisites_state = StateType.objects.create(name="Prerequisites"
                                                       , handler="prerequisites.py"
                                                       , state_settings=global_category
                                                       , module="default"
                                                       , dependentOn=passwordless_login_state
                                                       , jobtype="SIMPLE_STATE")

        sethostname_state = StateType.objects.create(name='Set-hostname'
                                                     , handler='set-hostname.py'
                                                     , state_settings=global_category
                                                     , module='default'
                                                     , dependentOn=passwordless_login_state
                                                     , jobtype="SIMPLE_STATE")

        #salt_minion_state = StateType.objects.create(name="Salt-minion"
        #                                             , handler="install-salt.py"
        #                                             , state_settings=global_category
        #                                             , dependentOn=sethostname_state
        #                                             , module="rxsalt"
        #                                             , jobtype="SIMPLE_STATE")
        salt_master_state = StateType.objects.create(name="Salt-master",
                                                     handler="install-salt-master.py",
                                                     dependentOn=None,
                                                     state_settings=global_category,
                                                     module="rxsalt", jobtype="SIMPLE_STATE")
        #salt_minion_master_state = StateType.objects.create(name="Salt-minion-master",
        #                                                    handler="install-salt.py",
        #                                                    state_settings=global_category,
        #                                                    dependentOn=salt_master_state,
        #                                                    module="rxsalt", jobtype="SIMPLE_STATE")
        #salt_api_state = StateType.objects.create(name="Salt-Api", handler="install-salt-api.py",
        #                                          state_settings=salt_settings_category,
        #                                          dependentOn=salt_minion_master_state,
        #                                          module="rxsalt", jobtype="SIMPLE_STATE")
        # salt_run_state = StateType.objects.create(name="Salt-Run-State", handler="salt-command-module.py", dependentOn=None,module="rxsalt", jobtype="REPEATABLE_STATE")

        #salt_run_state = StateType.objects.create(name="Salt-Run-State",
        #                                          handler="salt-command-module.py",
        #                                          dependentOn=None, module="rxsalt",
        #                                          jobtype="REPEATABLE_STATE",
        #                                          state_settings=global_category)


        #accept_salt_master_state = StateType.objects.create(name="Accept-Salt-Master",
        #                                                            handler='salt-command-module.py',
        #                                                            dependentOn=salt_api_state, module="rxsalt",
        #                                                            jobtype="COMPLEX_STATE",
        #                                                            state_settings=salt_accept_master_category)

        #salt_utils = StateType.objects.create(name="Salt-Utils",
        #                                          handler="salt-command-module.py",
        #                                          dependentOn=accept_salt_master_state, module="rxsalt",
        #                                          jobtype="COMPLEX_STATE",
        #                                          state_settings=global_category)



        #passwordless_login_state.save()
        #sethostname_state.save()
        #prerequisites_state.save()
        #salt_minion_state.save()
        #salt_master_state.save()
        #salt_minion_master_state.save()
        #salt_api_state.save()
        #salt_run_state.save()
        #salt_utils.save()

        # capabilities
        standard_capability = Capability.objects.create(name="standard")
        salt_minion_capability = Capability.objects.create(name="salt-minion")
        salt_master_capability = Capability.objects.create(name="salt-master")

        #utils_capability = Capability.objects.create(name="utils")
        #utils_capability.statetypes.add(salt_utils)
        #utils_capability.dependentOn = salt_master_capability

        standard_capability.statetypes.add(passwordless_login_state)
        standard_capability.statetypes.add(sethostname_state)
        standard_capability.statetypes.add(prerequisites_state)
        #salt_minion_capability.statetypes.add(salt_minion_state)
        #salt_minion_capability.dependentOn = standard_capability
        salt_master_capability.statetypes.add(salt_master_state)
        #salt_master_capability.statetypes.add(salt_minion_master_state)
        #salt_master_capability.statetypes.add(salt_api_state)
        #salt_master_capability.statetypes.add(salt_run_state)

        salt_master_capability.dependentOn = standard_capability
        buildin_saltmaster_profiletype.capabilities.add(standard_capability)
        #buildin_saltmaster_profiletype.capabilities.add(salt_master_capability)
        #buildin_saltmaster_profiletype.capabilities.add(utils_capability)
        #buildin_default_rxrelease_profiletype.capabilities.add(standard_capability)
        # TODO: dit kan in principe weggehaald worden 'capabilities saven'

        standard_capability.save()
        #salt_minion_capability.save()
        #salt_master_capability.save()
        #utils_capability.save()

        buildin_saltmaster_profiletype.save()
        buildin_saltmaster_profile.save()
        buildin_saltmaster_configuration.save()
