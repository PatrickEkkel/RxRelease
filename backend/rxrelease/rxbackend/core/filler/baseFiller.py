from .profileFiller import ProfileFiller
from ...models import StateType
from ...models import SettingsCategory
from ...models import Capability
from ...models import ProfileType
from ...models import Profile
from ...models import Configuration
from ...models import KVSetting
from ...models import Module
class BaseFiller:
    def createBaseFillForSalt(self):
        # Dit is hoe token authentication werkt voor als we willen weten hoe we een nieuwe user willen maken of willen weten hoe het zaakje geconfigureerd
        # http://cheng.logdown.com/posts/2015/10/27/how-to-use-django-rest-frameworks-token-based-authentication

        salt_module = Module.objects.create(name="rxsalt",active=False,menuoptionname="Salt")
        salt_module.save()



        # Built in profiletypes
        buildin_default_rxrelease_profiletype = ProfileType.objects.create(name="Default")
        buildin_default_profile = Profile.objects.create(name="Default")
        buildin_default_profile.profiletype = buildin_default_rxrelease_profiletype
        buildin_default_configuration = Configuration.objects.create(name="Default Configuration",profile=buildin_default_profile)

        buildin_saltmaster_profiletype = ProfileType.objects.create(name="Salt Master")
        buildin_saltmaster_profile = Profile.objects.create(name="RxRelease Salt Master")
        buildin_saltmaster_profile.profiletype = buildin_saltmaster_profiletype
        buildin_saltmaster_configuration = Configuration.objects.create(name="Salt master default Configuration",profile=buildin_saltmaster_profile)
        #buildin_saltmaster_configuration.profile = buildin_saltmaster_profile


        # Settings category maken
        global_category = SettingsCategory.objects.create(name="Global Settings")
        global_category.save()

        kvsetting_os = KVSetting.objects.create(key="os",value="CentOS",category=global_category)
        kvsetting_os.save()
        # Standard settings applyen
        kvsetting_saltmaster = KVSetting.objects.create(key="saltmaster",value="",category=global_category)
        kvsetting_saltmaster.category = global_category
        kvsetting_saltmaster.save()

        # De verschillende basis states maken
        passwordless_login_state = StateType.objects.create(name="SSH passwordless login",handler="passwordless-sshlogin.py",SettingsCategory=global_category,module="default")
        salt_minion_state = StateType.objects.create(name="Salt-minion",handler="install-salt.py",SettingsCategory=global_category,dependentOn=passwordless_login_state,module="rxsalt")
        salt_master_state = StateType.objects.create(name="Salt-master",handler="install-salt-master.py",dependentOn=passwordless_login_state,SettingsCategory=global_category,module="rxsalt")
        salt_minion_master_state = StateType.objects.create(name="Salt-minion-master",handler="install-salt.py",SettingsCategory=global_category,dependentOn=salt_master_state,module="rxsalt")

        passwordless_login_state.save()
        salt_minion_state.save()
        salt_master_state.save()
        salt_minion_master_state.save()
        # capabilities
        standard_capability = Capability.objects.create(name="standard")
        salt_minion_capability = Capability.objects.create(name="salt-minion")
        salt_master_capability = Capability.objects.create(name="salt-master")

        standard_capability.statetypes.add(passwordless_login_state)
        salt_minion_capability.statetypes.add(salt_minion_state)
        salt_minion_capability.dependentOn = standard_capability
        salt_master_capability.statetypes.add(salt_master_state)
        salt_master_capability.statetypes.add(salt_minion_master_state)

        salt_master_capability.dependentOn = standard_capability


        #buildin_saltmaster_profiletype.capabilities.add(salt_minion_capability)
        buildin_saltmaster_profiletype.capabilities.add(standard_capability)
        buildin_saltmaster_profiletype.capabilities.add(salt_master_capability)

        buildin_default_rxrelease_profiletype.capabilities.add(standard_capability)


        standard_capability.save()
        salt_minion_capability.save()
        salt_master_capability.save()

        buildin_saltmaster_profiletype.save()
        buildin_saltmaster_profile.save()
        buildin_saltmaster_configuration.save()
