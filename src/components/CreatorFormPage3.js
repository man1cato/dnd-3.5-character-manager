import React from 'react';
import _ from 'lodash';
import { Field, ErrorMessage } from 'formik';


const CreatorFormPage3 = ({setFieldValue, handleAbilityScoreRoll}) => (
    <React.Fragment>
        <div className="d-flex justify-content-between align-items-center mb-5">
            <h3>Set Ability Scores</h3>
            <button 
                className="button" 
                type="button" 
                key="rollButton" 
                onClick={() => handleAbilityScoreRoll(setFieldValue)}
            >
                Roll
            </button>
        </div>

        <div className="form__group">
            <div className="form__content--50-50">
                <h4>Strength (STR):</h4>
                <Field name="str" />                                   
            </div>
            <ErrorMessage name="str" />
        </div> 

        <div className="form__group">
            <div className="form__content--50-50">
                <h4>Dexterity (DEX):</h4>
                <Field name="dex" />                                   
            </div>
            <ErrorMessage name="dex" />
        </div>

        <div className="form__group">
            <div className="form__content--50-50">
                <h4>Constitution (CON):</h4>
                <Field name="con" />                                   
            </div>
            <ErrorMessage name="con" />
        </div>

        <div className="form__group">
            <div className="form__content--50-50">
                <h4>Intelligence (INT):</h4>
                <Field name="int" />                                   
            </div>
            <ErrorMessage name="int" />
        </div>

        <div className="form__group">
            <div className="form__content--50-50">
                <h4>Wisdom (WIS):</h4>
                <Field name="wis" />                                   
            </div>
            <ErrorMessage name="wis" />
        </div>

        <div className="form__group">
            <div className="form__content--50-50">
                <h4>Charisma (CHA):</h4>
                <Field name="cha" />                                   
            </div>
            <ErrorMessage name="cha" />
        </div>

    </React.Fragment>
);


export default CreatorFormPage3;