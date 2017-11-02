from ...models import CredentialsSetting

class SettingsDao:

    def __init__(self):
        pass
    def getCredentialSettingsById(self,id):
        credential_setting_id = id
        credentials =  CredentialsSetting.objects.get(id = credential_setting_id)
        return credentials;
