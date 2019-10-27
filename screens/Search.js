import React, {Component} from 'react';
import {Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import styled from 'styled-components';
import arrow from './arrow.png';
import logo from './achilles.png';

var body = JSON.stringify({
  Inputs: {
    input1: {
      ColumnNames: [
        'race-AfricanAmerican',
        'race-Asian',
        'race-Caucasian',
        'race-Hispanic',
        'gender-Female',
        'gender-Male',
        'age',
        'admission_type_id-1',
        'admission_type_id-2',
        'admission_type_id-3',
        'admission_type_id-5',
        'admission_type_id-6',
        'discharge_disposition_id-1',
        'discharge_disposition_id-3',
        'discharge_disposition_id-6',
        'admission_source_id-1',
        'admission_source_id-4',
        'admission_source_id-7',
        'admission_source_id-17',
        'time_in_hospital',
        'num_lab_procedures',
        'num_procedures',
        'num_medications',
        'number_outpatient',
        'number_emergency',
        'number_inpatient',
        'number_diagnoses',
        'diabetesMed',
        'annual',
        'zip',
      ],
      Values: [
        [
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
        ],
        [
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0.7',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
        ],
      ],
    },
  },
  GlobalParameters: {
    'Append score columns to output': '',
  },
});

var obj = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:
      'Bearer zwffosvrc9pwRcKx98pQXXta0LXvvdYEkiG+7hTfYYPM/jEyYkkF1hF89ahDRAgleK5yTyen0yWPD59C/0L1ZQ==',
    'Content-Length': body.length,
  },
  body: body,
};

class Search extends Component {
  static navigationOptions = {
    title: 'Search',
    headerStyle: {
      display: 'none',
    },
  };
  state = {searchTerm: '', riskAssessed: null, name: ''};

  searchPatient = name => {
    fetch(
      'http://nprogram.azurewebsites.net/raw/Patient?name=' +
        name +
        '&_format=json',
    )
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.storePatient(data.entry[0].resource.id);
      })
      .catch(console.log);
  };

  storePatient = id => {
    fetch(
      'http://nprogram.azurewebsites.net/raw/Patient/' + id + '?_format=json',
    )
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.setState({name: data.name[0].given[0]});
        this.learn();
      })
      .catch(console.log);
  };

  learn = () => {
    fetch(
      'https://ussouthcentral.services.azureml.net/workspaces/8d697513c52c41399339d806748927cf/services/57362c9bda1540728cc4a488303ed119/execute?api-version=2.0&details=true',
      obj,
    )
      .then(data => data.json())
      .then(data =>
        this.setState({riskAssessed: data.Results.output1.value.Values[1][1]}),
      )
      .catch(console.log);
  };

  render() {
    return (
      <AppWrapper>
        <LargeLogo source={logo} />
        <TextInput
          onChangeText={searchTerm => this.setState({searchTerm})}
          style={{borderColor: 'gray', borderWidth: 1, width: '70%'}}
        />
        <TouchableOpacity
          onPress={() => this.searchPatient(this.state.searchTerm)}>
          <CustomText>Search</CustomText>
        </TouchableOpacity>
        <NextButton
          onPress={() =>
            this.props.navigation.navigate('Home', {
              riskAssessed: this.state.riskAssessed,
              name: this.state.name,
            })
          }>
          <Image source={arrow} style={{width: 45, height: 38}} />
        </NextButton>
      </AppWrapper>
    );
  }
}

const AppWrapper = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const CustomText = styled.Text`
  font-family: UberMoveText-Bold;
  font-size: 16px;
  margin-top: 20px;
`;

const NextButton = styled.TouchableOpacity`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: #2684e7;
  position: absolute;
  bottom: 20;
  right: 20;
  justify-content: center;
  align-items: center;
`;

const LargeLogo = styled.Image`
  margin-top: -100px;
  margin-bottom: 50px;
  border-radius: 25px;
  width: 100px;
  height: 100px;
`;

export default Search;
