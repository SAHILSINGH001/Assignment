import React,{useState,useEffect} from 'react'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';
import { FaBeer } from "react-icons/fa";
export default function MultiForm() {
    const [step,setStep]=useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [country, setCountry] = useState("");
   const [file, setFile] = useState(null);
    const [multiFiles, setMultiFiles] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
   const [valid,setValid]=useState(true);
   const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState(localStorage.getItem('location') || '');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                let lat, lon;
                if (location && location.trim() !== '') {
                    
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=fa159c10afad1b327c67736381f2ca89`
                    );
                    lat = response.data.coord.lat;
                    lon = response.data.coord.lon;
                }
                 else {
                    
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });
                    lat = position.coords.latitude;
                    lon = position.coords.longitude;

                    
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fa159c10afad1b327c67736381f2ca89`
                    );
                    setLocation(response.data.name);
                }
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fa159c10afad1b327c67736381f2ca89`
                );
                setWeatherData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchWeatherData();
    }, [location]);

    const handleLocationChange = (event) => {
        const newLocation = event.target.value;
        setLocation(newLocation);
        localStorage.setItem('location', newLocation);
    };

    const handleMouseEnter = () => {
        setIsEditing(true);
    };

    const handleMouseLeave = () => {
        setIsEditing(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLocation(location.trim());
        setIsEditing(false);
};
    const handleNext=()=>{
        setStep(step+1);
    }
    const handlePrevious=()=>{
        setStep(step-1);
    }
    const uploadfile=(file)=>{
       //setFile(file);
    }
    const handleFormSubmit = async(e) => {
        e.preventDefault();
        try {
          // Make API call to submit form data
          const formData = new FormData();
          formData.append('name', name);
          formData.append('email', email);
          formData.append('phone', phone);
          formData.append('addressLine1', addressLine1);
          formData.append('addressLine2', addressLine2);
          formData.append('city', city);
          formData.append('state', state);
          formData.append('pincode', pincode);
          formData.append('country', country);
          formData.append('file', file);
    
          
          for (let i = 0; i < file.length; i++) {
            formData.append(`file${i}`, file[i]);
          }
    
          await axios.post('https://x8ki-letl-twmt.n7.xano.io/apidoc:XooRuQbs/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer your-auth-token', 
            },
          });
    
         setFormSubmitted(true);
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      
     };
     const handlePhone=(value)=>{
       
        setPhone(value);
        setValid(validatePhoneNo(value))
     };
     const validatePhoneNo=(phoneno)=>{
      const phonenoPattern=/^\d{10}$/;
      return phonenoPattern.test(phoneno)
     }
    
     
    const handleMultipleFile=(event)=>{
        setMultiFiles(event.target.multiFiles);
          }
          const handleUpload=()=>{
            const formData=new FormData();
            for(let i=0;i<multiFiles.length; i++){
              formData.append(`images[${i}]`,multiFiles[0]);
            }
            fetch('',{
              method:'POST',
              body:formData
            }).then(res=>res.json()).then(data=>console.log(data)).catch(err=>console.log(err));
          }
    return(
    <div className='form-container'>
    <div className='heading'>
        <h1>Multi-Step Form with Progress Indicator</h1>
       
<div>
        <progress value={step} max={5} />
        <span>Step {step} of 5</span>
      </div>
      </div>
      {
        step===1 &&(
            <div className='container'>
            <h1>Basic Details</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className='details'>
                        <label htmlFor='username'>Username:</label>
                        <input type='text' placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)}required></input>
                    </div>
                    <div className='details'>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                    </div>
                    <div className='details'>
                        <label htmlFor='phoneNumber'>PhoneNo:</label>
                        <PhoneInput country={'us'} placeholder='Enter Your No' value={phone} onChange={handlePhone} inputProps={{required:true,}} required></PhoneInput>
                      {!valid&&<p>Please enter a valid 10-digit Phone Number</p>}                
                    </div>
                   
                </form>
                <button type="submit" onClick={handleNext}>Next</button>
            </div>
        ) 
      }
      {
        step===2 &&(
            <div className='container'>
            <h1>Address</h1>
                <form onSubmit={handleFormSubmit}>
                <div className='details'>
                <label htmlFor='username'>Address1:</label>
                <input type="text" placeholder="Address Line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} required />
                </div>
                <div className='details'>
                <label htmlFor='username'>Address2:</label>
               <input type="text" placeholder="Address Line 2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
               </div>
               <div className='details'>
               <label htmlFor='username'>City:</label>
                <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div className='details'>
                <label htmlFor='username'>State:</label>
               <input type="text"  placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required/>
               </div>
               <div className='details'>
               <label htmlFor='username'>PinCode:</label>
               <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
               </div>
               <div className='details'>
               
               <label htmlFor='username'>Country:</label>
               <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required/>
               </div>
             
                </form>
                <button type="button" onClick={handlePrevious}>Previous</button>
            <button type="submit" onClick={handleNext}>Next</button>
            </div>
        )
      }
      {
        step===3 &&(
            <div className='container'>
                <h1>File Upload:</h1>
                <form onSubmit={handleFormSubmit}>
                <div className='detils'>
                <label htmlFor='file'>Upload File: </label>
                <input type="file" accept=".png,.pdf" onChange={(e) =>uploadfile(e)} required  />
                
                </div>
          
                </form>
                <button type="button" onClick={handlePrevious}>Previous</button>
            <button type="submit" onClick={handleNext}>Next</button>
            </div>
        )
      }
      {
        step===4 &&(
            <div className='container'>
                <h1>Multi File Upload:</h1>
                <form onSubmit={handleFormSubmit}>
                <input type="file" multiple accept=".png,.pdf" onChange={handleMultipleFile} required/>
                <button onClick={handleUpload}>Upload</button>
            
               <div className='details'>
               {isEditing ? (
                
                <form onSubmit={handleSubmit}>
                <p>Geolocation captured!</p>
                    <input type="text"  placeholder="Enter location"  value={location}  onChange={handleLocationChange}/>
                    <button type="submit" onClick={handleSubmit}>Save</button>
                </form>
            ) : (
                <><FaBeer style={{fontSize:"15px"}}/>
                    <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        {location}
                        
                    </span>
                    {weatherData && (
                        <div className="weather-data">
                            <div>{weatherData.weather[0].name}</div>
                        </div>
                    )}
                </>
            )}
                
               </div>
           
                </form>
                <button type="button" onClick={handlePrevious} >Previous</button>
            <button type="submit" onClick={handleNext}> Next</button>
           
            </div>
        )
      }
      {
        step===5 &&(
            <div className='container'>
          <h2>Step 5: Status</h2>
          <p>Form submission completed!</p>
        </div>
        )
      }

    </div>
  )
}
