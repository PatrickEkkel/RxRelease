from .profileFiller import ProfileFiller
from ...models import StateType
from ...models import SettingsCategory
from ...models import Capability
from ...models import ProfileType
from ...models import Profile
from ...models import Configuration
class BaseFiller:
    def createBaseFillForSalt(self):


        # Built in profiletypes

        buildin_saltmaster_profiletype = ProfileType.objects.create(name="Salt Master")
        buildin_saltmaster_profile = Profile.objects.create(name="RxRelease Salt Master")
        buildin_saltmaster_profile.profiletype = buildin_saltmaster_profiletype
        buildin_saltmaster_configuration = Configuration.objects.create(name="Salt master default Configuration",profile=buildin_saltmaster_profile)
        #buildin_saltmaster_configuration.profile = buildin_saltmaster_profile


        # Settings category maken
        global_category = SettingsCategory.objects.create(name="Global Settings")

        # De verschillende basis states maken
        passwordless_login_state = StateType.objects.create(name="SSH passwordless login",handler="passwordless-sshlogin.py",SettingsCategory=global_category)
        salt_minion_state = StateType.objects.create(name="Salt minion",handler="install-salt.py",SettingsCategory=global_category,dependentOn=passwordless_login_state)
        salt_master_state = StateType.objects.create(name="salt-master",handler="intstall-salt-master.py",dependentOn=passwordless_login_state,SettingsCategory=global_category)

        global_category.save()
        passwordless_login_state.save()
        salt_minion_state.save()
        salt_master_state.save()
        # capabilities
        standard_capability = Capability.objects.create(name="standard",module="default")
        salt_minion_capability = Capability.objects.create(name="salt-minion",module="rxsalt")
        salt_master_capability = Capability.objects.create(name="salt-master",module="rxsalt")


        standard_capability.statetypes.add(passwordless_login_state)

        salt_minion_capability.statetypes.add(passwordless_login_state)
        salt_minion_capability.statetypes.add(salt_minion_state)

        salt_master_capability.statetypes.add(passwordless_login_state)
        salt_master_capability.statetypes.add(salt_minion_state)
        salt_master_capability.statetypes.add(salt_master_state)
        buildin_saltmaster_profiletype.capabilities.add(salt_master_capability)

        #salt_minion_state.statetypes.append(salt_minion_state)
        #salt_master_state.statetypes.append(salt_master_state)

        standard_capability.save()
        salt_minion_capability.save()
        salt_master_capability.save()

        buildin_saltmaster_profiletype.save()
        buildin_saltmaster_profile.save()
        buildin_saltmaster_configuration.save()