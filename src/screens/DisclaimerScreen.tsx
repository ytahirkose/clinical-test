import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Card, Icon, MD3Colors, useTheme} from 'react-native-paper';
import NativeButton from '../components/NativeButton';
import { createTestTypes } from '../data/testTypes';
import { useTranslation } from 'react-i18next';

type DisclaimerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Disclaimer'>;
type DisclaimerScreenRouteProp = RouteProp<RootStackParamList, 'Disclaimer'>;

interface Props {
  navigation: DisclaimerScreenNavigationProp;
  route: DisclaimerScreenRouteProp;
}

const DisclaimerScreen: React.FC<Props> = ({ navigation, route }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { userSelection } = route.params;
  const [accepted, setAccepted] = useState(false);

  const toggleAcceptance = useCallback(() => {
    setAccepted(!accepted);
  }, [accepted]);

  const handleAccept = useCallback(() => {
    if (accepted && userSelection.testType) {
      const testTypes = createTestTypes(t);
      const selectedTest = testTypes.find(t => t.id === userSelection.testType);
      if (selectedTest) {
        navigation.navigate('Test', { userSelection, testType: selectedTest });
      } else {
        Alert.alert(t('common.error'), t('disclaimer.testTypeNotFound'));
        navigation.navigate('TestSelection');
      }
    }
  }, [accepted, userSelection, navigation, t]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ paddingHorizontal: 16 }} contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <Icon
                source="alert"
                color={theme.colors.tertiary}
                size={40}
            />
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12, textAlign: 'center', color: theme.colors.tertiary }}>
             {t('disclaimer.title')}
          </Text>
          <Text style={{ fontSize: 16, textAlign: 'center', color: theme.colors.onSurface }}>
            {t('disclaimer.subtitle')}
          </Text>
        </View>

        <Card style={{ marginBottom: 24, backgroundColor: theme.colors.tertiaryContainer, borderColor: theme.colors.tertiary }}>
          <Card.Content>
            <Text style={{ fontSize: 16, color: theme.colors.onSurface }}>
              {t('disclaimer.content')}
            </Text>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: theme.colors.primary }}>
              {t('disclaimer.responsibilityTitle')}
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 22, color: theme.colors.onSurface }}>
              {t('disclaimer.responsibilityContent')}
            </Text>

            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.error }}>
                <Icon
                  source="alert"
                  color={theme.colors.tertiary}
                  size={20}
              /> {t('disclaimer.notDiagnosticTitle')}
              </Text>
              <Text style={{ fontSize: 14, marginTop: 8, color: theme.colors.onSurfaceVariant }}>
                {t('disclaimer.notDiagnosticContent')}
              </Text>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.error }}>
                  <Icon
                      source="alert"
                      color={theme.colors.tertiary}
                      size={20}
                  /> {t('disclaimer.noLiabilityTitle')}
              </Text>
              <Text style={{ fontSize: 14, marginTop: 8, color: theme.colors.onSurfaceVariant }}>
                {t('disclaimer.noLiabilityContent')}
              </Text>
            </View>

            <View>
              <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.error }}>
                  <Icon
                      source="alert"
                      color={theme.colors.tertiary}
                      size={20}
                  /> {t('disclaimer.expertOpinionTitle')}
              </Text>
              <Text style={{ fontSize: 14, marginTop: 8, color: theme.colors.onSurfaceVariant }}>
                {t('disclaimer.expertOpinionContent')}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={{ marginBottom: 24 }}>
          <Card.Content>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: theme.colors.primary }}>
              {t('disclaimer.consentAndAgreement')}
            </Text>
            <TouchableOpacity
              onPress={toggleAcceptance}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderWidth: 2,
                borderRadius: 8,
                borderColor: accepted ? theme.colors.primary : theme.colors.outline,
                paddingHorizontal: 16,
                backgroundColor: accepted ? theme.colors.primaryContainer : 'transparent'
              }}
            >
              <Icon
                source={accepted ? 'check-circle' : 'circle-outline'}
                size={24}
                color={accepted ? theme.colors.primary : theme.colors.outline}
              />
              <Text style={{ fontSize: 16, marginLeft: 12, flex: 1, color: theme.colors.onSurface }}>
                {t('disclaimer.readAndAgree')}
              </Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>

        <NativeButton
          variant="contained"
          onPress={handleAccept}
          disabled={!accepted}
          style={{ marginBottom: 16 }}
        >
          {t('disclaimer.continue')}
        </NativeButton>

        <NativeButton
          variant="outlined"
          onPress={() => navigation.goBack()}
        >
          {t('disclaimer.goBack')}
        </NativeButton>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DisclaimerScreen;
