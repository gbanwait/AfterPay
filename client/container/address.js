import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Input from '../component/input';
import Select from '../component/select';

class Address extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address : {
                line1: '',
                line2: '',
                city: '',
                state: '',
                zip: ''
            },
            stateOption: ['AZ', 'CA', 'NY', 'NV'],
            error: {
                formError: false,
                line1: false,
                line2: false,
                city: false,
                state: false,
                zip: false
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.validateAddress = this.validateAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {

        let target = e.target;
        let value = target.value;
        let name = target.name;
        this.setState(prevState => ({
            error : {
                ...prevState.error,
                formError: false,
                line1: false,
                city: false,
                state: false,
                zip: false 
            }
        }))     

        this.setState(prevState => ({ address : {
            ...prevState.address,
            [name]: value
        }}));    
    }

    validateAddress(e) {

        let target = e.target,
            value = target.value,
            name = target.name;

            if (name === 'zip') {
                if ((value.length != 5) || isNaN(value)) {
                   this.setState(prevState => ({
                       error : {
                           ...prevState.error,
                           zip: true 
                       }
                   }))
                }
            }

    }

    handleSubmit(e) {
        
        let line1 = this.state.address.line1,
            line2 = this.state.address.line2,
            city = this.state.address.city,
            state = this.state.address.state,
            zip = this.state.address.zip,
            formError = ((line1 === '') || (city === '') || (state === '') || (zip === '')) ? true : false;
            

            if (formError) {
                e.preventDefault();
            }
            this.setState(prevState => ({
                error : {
                    ...prevState.error,
                    formError,
                    line1: (line1 === '') ? true : false,
                    city: (city === '') ? true : false,
                    state: (state === '') ? true : false,
                    zip: (zip === '') ? true : false 
                }
            }))        
    }
    render() {
        return (
            <div className="address">
                <h2>Add Address</h2>
                {this.state.error.formError ?  <div id="formError">Please correct the below information</div> : ''}
                <form className="addAddress">
                    <Input 
                        name={'line1'}
                        labelClass={'form-lable'}
                        title={''}
                        id={'line1'}
                        type={'text'}
                        value={this.state.address.line1}
                        class=''
                        action={this.handleChange}
                        error={this.state.error.line1}
                        errorMessage={''}
                        placeHolder={'Address Line 1'} />

                    <Input 
                        name={'line2'}
                        labelClass={'form-lable'}
                        title={''}
                        id={'line2'}
                        type={'text'}
                        value={this.state.address.line2}
                        class=''
                        action={this.handleChange}
                        error={this.state.error.line2}
                        errorMessage={''}
                        placeHolder={'Address Line 2 (Optional)'} />

                    <Input 
                        name={'city'}
                        labelClass={'form-lable'}
                        title={''}
                        id={'city'}
                        type={'text'}
                        value={this.state.address.city}
                        class=''
                        action={this.handleChange}
                        error={this.state.error.city}
                        errorMessage={''}
                        placeHolder={'City'} />

                    <Select 
                        name={'state'}
                        labelClass={'form-lable'}
                        title={''}
                        id={'state'}
                        class={'form-select'}
                        action={this.handleChange}
                        name={'state'}
                        value={this.state.address.state}
                        options={this.state.stateOption}
                        error={this.state.error.state}
                        errorMessage={''}
                        placeHolder={'Select State'} />
                        
                    <Input 
                        name={'zip'}
                        labelClass={'form-lable'}
                        title={''}
                        id={'zip'}
                        type={'text'}
                        value={this.state.address.zip}
                        class=''
                        onBlur={this.validateAddress}
                        action={this.handleChange}
                        max={'5'}
                        error={this.state.error.zip}
                        errorMessage={'Please enter valid Zip code'}
                        placeHolder={'Zip Code'} />

                        <Link to={{ pathname: "/card", 
                                    state : {
                                        address : this.state.address
                                    }
                        }}><button className="btn submit" onClick={this.handleSubmit}>Submit</button></Link>      
                </form>
            </div>
        )
    }
}

export default Address;