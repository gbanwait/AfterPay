import React, {Component} from 'react';
import Input from '../component/input';
import Select from '../component/select';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: {
                name: '',
                number: '',
                month: '',
                year: '',
                cvc: ''
            },
            year: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
            month: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            error: {
                formError: false,
                name: false,
                number: false,
                month: false,
                year: false,
                cvc: false
            },
            order: {
                status: false,
                token: '',
                expire: ''
            } 
        }
        this.handleChange = this.handleChange.bind(this);
        this.validateCard = this.validateCard.bind(this);
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
                number: false,
                name: false,
                month: false,
                year: false,
                cvc: false  
            }
        }))  

        this.setState(prevState => ({
            card: {
                ...prevState.card,
                [name]:value
            }
        }))
    }

    validateCard(e) {
        let target = e.target;
        let name = e.target.name;
        let value = target.value;
        
        // Validate Number
        if (name === 'number') {
            if (value.length != 16 || isNaN(value)) {
                this.setState(prevState => ({
                    error : {
                        ...prevState.error,
                        number: true 
                    }
                }))
            } 
        }
        // Validate CVC
        if (name === 'cvc') {
            if (value.length != 3 || isNaN(value)) {
                this.setState(prevState => ({
                    error : {
                        ...prevState.error,
                        cvc: true 
                    }
                }))
            } 
        }
    }

    handleSubmit(e) {
        // Validate form date before submit
        e.preventDefault(); 
        let number = this.state.card.number,
            name = this.state.card.name,
            month = this.state.card.month,
            year = this.state.card.year,
            cvc = this.state.card.cvc,
            formError = ((number === '') || (name === '') || (month === '') || (year === '') || (cvc === '')) ? true: false;
            
            this.setState(prevState => ({
                error : {
                    ...prevState.error,
                    formError,
                    number: (number === '') ? true : false,
                    name: (name === '') ? true : false,
                    month: (month === '') ? true : false,
                    year: (year === '') ? true : false,
                    cvc: (cvc === '') ? true : false  
                }
            }))  
            // Post Data to server 
            if (!formError){
                let postData = {card : this.state.card, address: this.props.location.state.address};
                fetch('/card', {
                    method: 'POST',
                    body: JSON.stringify(postData),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                }).then(response => response.json())
                .then(json => this.setState(prevState => ({
                    order: {
                        ...prevState.order,
                        status: true,
                        token: json.token,
                        expire: json.expires
                    }
                })))
                .catch(err => console.log(err));
            }
    }

    render() {
        return (
            <div className="card">
                <h2>Add Credit Card</h2>
               {this.state.error.formError ? <div id="formError">Please correct the below information</div>: ''}
               
               {this.state.order.status ?
                    <div id="success">
                        <p>AfterPay order created : </p>
                        <p><code>Token: {this.state.order.token}</code></p>
                        <p><code>Expires: {this.state.order.expire}</code></p>
                    </div> 
                : ''}

            <form className="addCard">   
               <Input 
                    name={'name'}
                    labelClass={'form-lable'}
                    title={''}
                    id={'name'}
                    type={'text'}
                    value={this.state.card.name}
                    class='cardName'
                    action={this.handleChange}
                    error={this.state.error.name}
                    errorMessage={'Please enter cardholder name'}
                    placeHolder={'Full Name'} />

                <Input 
                    name={'number'}
                    labelClass={'form-lable'}
                    title={''}
                    id={'number'}
                    type={'text'}
                    value={this.state.card.number}
                    class='cardNumber'
                    max={'16'}
                    action={this.handleChange}
                    onBlur={this.validateCard}
                    error={this.state.error.number}
                    errorMessage={'Please enter card number'}
                    placeHolder={'Card Number'} />
                
                <Select 
                    name={'month'}
                    parentClass={'form-group-select'}
                    labelClass={'form-lable'}
                    title={''}
                    id={'month'}
                    class={'form-select cardMonth'}
                    action={this.handleChange}
                    name={'month'}
                    value={this.state.card.month}
                    options={this.state.month}
                    error={this.state.error.month}
                    errorMessage={''}
                    placeHolder={'Select Month'} />


                <Select 
                    name={'year'}
                    parentClass={'form-group-select'}
                    labelClass={'form-lable'}
                    title={''}
                    id={'year'}
                    class={'form-select cardYear'}
                    action={this.handleChange}
                    name={'year'}
                    value={this.state.card.year}
                    options={this.state.year}
                    error={this.state.error.year}
                    errorMessage={''}
                    placeHolder={'Select Year'} />

                <Input 
                    name={'cvc'}
                    labelClass={'form-lable'}
                    title={''}
                    id={'cvc'}
                    max={'3'}
                    type={'text'}
                    value={this.state.card.cvc}
                    class='cardCVC'
                    action={this.handleChange}
                    onBlur={this.validateCard}
                    error={this.state.error.cvc}
                    errorMessage={'Please enter card cvc'}
                    placeHolder={'CVC'} />

                <button className="btn submit" onClick={this.handleSubmit}>Submit</button>   
            </form>
            </div>
        )
    }
}

export default Card;