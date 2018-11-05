import React from 'react';
import _ from 'lodash';
import { Field, ErrorMessage } from 'formik';


const CreatorFormPage3 = ({setFieldValue, handleAbilityScoreRoll}) => (
    <div className="form__body">
        <h3>Set Ability Scores</h3>
        <button 
            className="button" 
            type="button" 
            key="rollButton" 
            onClick={() => handleAbilityScoreRoll(setFieldValue)}
        >
            Roll
        </button>

        <div className="form__group form__content--50-50">
            <h4>Strength (STR):</h4>
            <Field name="str" />                                   
        </div>

        <div className="form__group form__content--50-50">
            <h4>Dexterity (DEX):</h4>
            <Field name="dex" />                                   
        </div>

        <div className="form__group form__content--50-50">
            <h4>Constitution (CON):</h4>
            <Field name="con" />                                   
        </div>

        <div className="form__group form__content--50-50">
            <h4>Intelligence (INT):</h4>
            <Field name="int" />                                   
        </div>

        <div className="form__group form__content--50-50">
            <h4>Wisdom (WIS):</h4>
            <Field name="wis" />                                   
        </div>

        <div className="form__group form__content--50-50">
            <h4>Charisma (CHA):</h4>
            <Field name="cha" />                                   
        </div>

    </div>
);


export default CreatorFormPage3;