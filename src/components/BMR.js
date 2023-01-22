import React from "react";
import bmr from "./bmr.css";
import $ from 'jquery'; 


class BMR extends React.Component{
    
    constructor(props){
        super(props)

        this.state = {
            gender:'',
            weight:'',
            age:'',
            heightinFeet:'',
            heightinInches:'',
            activity:'',
            bmr:''
        }

    }

    handleweightChange = (e) => {
        this.setState({weight: e.target.value})
    }
    handlegenderChange = (e) => {
        this.setState({gender: e.target.value})
    }
    handleageChange = (e) => {
        this.setState({age: e.target.value})
    }
    handleheightfeetChange = (e) => {
        this.setState({heightinFeet: e.target.value})
    }
    handleheightinchChange = (e) => {
        this.setState({heightinInches: e.target.value})
    }
    handleactivityChange = (e) => {
        this.setState({activity: e.target.value})
        
    }
   
    calculateBMR(){
        let userage = this.state.age;
        let heightFeet = this.state.heightinFeet;
        let heightInch = this.state.heightinInches;
        let activity = this.state.activity;
        let weight = this.state.weight;
        let gender = this.state.gender;
        

        if(userage === "" || heightFeet ==='' || heightInch === "" || weight === "" 
        || gender === ""){
            this.setState({ error: 'All fields are required! '})
            return;
        }

        // imperial formula

        let bmrCalc = '';
        let height = ((heightFeet * 30.48) + (heightInch * 2.54))
        if(gender == 2){
            bmrCalc = 66 + (6.2 * weight) + (12.7 * height) - (6.76 * userage)
        }else if(gender == 1){
            bmrCalc = 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * userage)
        }

        // metric
        let convertWeightIntoKG = this.state.weight*0.45359237;
        console.log(convertWeightIntoKG);
        let convertHeightInCM = this.state.height*2.54;
        console.log(convertHeightInCM);

        let calculateMetric="";
        if(gender == 2){
            calculateMetric = 66.5 + (13.75*convertWeightIntoKG) + (5.003*convertHeightInCM) - (6.755*userage)
        }else if(gender == 1){
            calculateMetric = 655 + (9.563*convertWeightIntoKG) + (1.850*convertHeightInCM) - (4.676*userage)
        }


        // Calculating activity
        this.setState({error:''})
        this.setState({bmr: bmrCalc})
    }

    calculateCalories(){
    let bmrValue = this.state.bmr;
    let valueOfActivity = this.state.activity

    // Calculating Calories
    let userCalories = bmrValue*valueOfActivity;

    this.setState({activity:userCalories})
    }

    render(){
        
        let error;
        if(this.state.error){
            error = <div className="error">{this.state.error}</div>
        }

        let resultBMR;
        if(this.state.bmr){
            resultBMR = <div className="result">{this.state.bmr}</div>
        }

        let userResult;
        if(this.state.activity){
            userResult = <div className="user_result">{this.state.activity}</div>
        }

        return(
            <div>
                <div id="bmrcalc">
                <div className="form">
                    <h2>BMR &amp; Daily Calorie Calculator</h2>
                    {error}
                    <div className="inputwrap">
                        <label className="label">Gender</label>
                        <label><input type="radio" checked={this.state.gender === '1'} onChange={this.handlegenderChange} className="genderF" name="gender" value="1" />Female</label>
                        <label><input type="radio" checked={this.state.gender === '2'} onChange={this.handlegenderChange} className="genderM" name="gender" value="2" />Male</label>
                    </div>
                    <div className="inputwrap">
                        <label className="label">Weight in Pounds</label><input type="number" value={this.state.weight} onChange={this.handleweightChange} name="weight" className="weight" min="0" max="999" />
                    </div>
                    <div className="inputwrap">
                        <label className="label">Height in feet and inches</label>
                        <input type="number" name="heightFeet" value={this.state.heightinFeet} onChange={this.handleheightfeetChange} className="heightFeet" min="0" max="8" />
                        <input type="number" name="heightInches" value={this.state.heightinInches} onChange={this.handleheightinchChange} className="heightInches" min="0" max="11" />
                    </div>
                    <div className="inputwrap">
                        <label className="label">Age in years</label><input type="number" value={this.state.age} onChange={this.handleageChange} className="age" name="age" min="0" max="120" />
                    </div>

                    <button type="button" className="btn_activity" onClick={() => this.calculateBMR()}>Calculate BMR</button>

                    
                    {resultBMR}

                    <div className="workout">
                        <div className="inputwrap">
                            <label className="label">Workout in a Week</label>
                            <select className="activity" id="activity" value={this.state.activity} onChange={this.handleactivityChange} name="activity">
                                <option value="">Select your Activity</option>
                                <option value="1.2">Sedentary (Very little or no exercise, and desk job)</option>
                                <option value="1.375">Lightly Active (Light exercise 1 to 3 days per week)</option>
                                <option value="1.55">Moderately Active (Moderate exercise 3 to 5 days per week)</option>
                                <option value="1.725">Very Active (Heavy exercise 6 to 7 days per week)</option>
                                <option value="1.9">Extremely Active (Very intense exercise, and physical job, exercise multiple times per day)</option>
                            </select>
                        </div>

                        <button onClick={() => this.calculateCalories()} type="button">Calculate Calories</button>
                       {userResult}
                    </div>
                </div>
            </div>
        </div>

        )
    }
}

export default BMR