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


class TestFiller:
    def createFillerForTest(self):
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


        # Salt settings category maken
        salt_settings_category = SettingsCategory.objects.create(name="Salt Settings",
                                                                 prefix="salt")
        salt_settings_category.save()

        # Settings category maken
        global_category = SettingsCategory.objects.create(name="Global Settings")
        global_category.save()

        kvsetting_os = KVSetting.objects.create(key="os", value="CentOS", category=global_category)
        kvsetting_os.save()
        # Standard settings applyen
        kvsetting_saltmaster = KVSetting.objects.create(key="saltmaster", value="",
                                                        category=global_category)
        kvsetting_saltmaster.category = global_category
        kvsetting_saltmaster.save()

        # De verschillende basis states maken
        # test_statetype1 = StateType.objects.create(name="test-state1", handler="testcommand.py",
        #                                            SettingsCategory=global_category,
        #                                           module="default")

        # test_statetype2 = StateType.objects.create(name="test-state2", handler="testcommand.py",
        #                                           SettingsCategory=salt_settings_category,
        #                                           dependentOn=test_statetype1, module="default")

        # salt_run_state = StateType.objects.create(name="Salt-Run-State", handler="testcommand.py",
        #                                          dependentOn=None, module="rxsalt",
        #                                          jobtype="REPEATABLE_STATE")

        accept_salt_master_state = StateType.objects.create(name="Accept-Salt-Master",
                                                            handler='salt-command-module.py',
                                                            dependentOn=None, module="rxsalt",
                                                            jobtype="COMPLEX_STATE",
                                                            state_settings=global_category)

        accept_salt_master_state.save()
        # salt_run_state.save()

        # capabilities
        standard_capability = Capability.objects.create(name="standard")
        # standard_capability.statetypes.add(test_statetype1)
        # standard_capability.statetypes.add(test_statetype2)
        # standard_capability.statetypes.add(salt_run_state)
        standard_capability.statetypes.add(accept_salt_master_state)

        # buildin_saltmaster_profiletype.capabilities.add(salt_minion_capability)
        buildin_saltmaster_profiletype.capabilities.add(standard_capability)
        buildin_default_rxrelease_profiletype.capabilities.add(standard_capability)

        standard_capability.save()

        buildin_saltmaster_profiletype.save()
        buildin_saltmaster_profile.save()
        buildin_saltmaster_configuration.save()
