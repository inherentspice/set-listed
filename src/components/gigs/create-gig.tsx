import React, {useState, FormEvent, Dispatch, SetStateAction} from "react";
import GigsService from "../../services/home/gigs";
import { GigData } from "../../types/gigs";

export default function CreateGig(props: {user: string, setGigs: Dispatch<SetStateAction<GigData[] | undefined>>}) {
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [venue, setVenue] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  async function createGig(
    e: FormEvent<HTMLFormElement>,
    startTime: Date,
    endTime: Date,
    country: string,
    city: string,
    streetAddress: string,
    name: string,
    venue: string,
    description: string
  ) {
    e.preventDefault();
    const formData = {
      creatingUser: props.user,
      startTime,
      endTime,
      country,
      city,
      streetAddress,
      name,
      venue,
      description
    };
    try {
      const newGig = await GigsService.postSkill(formData);
      props.setGigs((prevState) => {
        if (prevState === undefined) {
          return [newGig.data.gig];
        } else {
          return [...prevState, newGig.data.gig];
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  function handleStartTimeChange(e: React.ChangeEvent<HTMLInputElement>): void{
    const date = new Date(e.target.value);
    setStartTime(date);
  }

  function handleEndTimeChange(e: React.ChangeEvent<HTMLInputElement>): void{
    const date = new Date(e.target.value);
    setEndTime(date);
  }

  function handleCountryChange(e: React.ChangeEvent<HTMLInputElement>): void{
    setCountry(e.target.value);
  }

  function handleCityChange(e: React.ChangeEvent<HTMLInputElement>): void{
    setCity(e.target.value);
  }

  function handleStreetAddressChange(e: React.ChangeEvent<HTMLInputElement>): void{
    setStreetAddress(e.target.value);
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void{
    setName(e.target.value);
  }

  function handleVenueChange(e: React.ChangeEvent<HTMLInputElement>): void{
    setVenue(e.target.value);
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>): void{
    setDescription(e.target.value);
  }

  return (
    <div>
      <form className="expanded-profile-overlay-form" onSubmit={(e) => createGig(e, startTime, endTime, country, city, streetAddress, name, venue, description)}>
        <label className="expanded-profile-overlay-form-item">Event Name:
          <input placeholder="Ex: Tai Chi Comedy" value={name} onChange={handleNameChange}></input>
        </label>
        <label className="expanded-profile-overlay-form-item">Venue:
          <input placeholder="Ex: The Attic" value={venue} onChange={handleVenueChange}></input>
        </label>
        <label className="expanded-profile-overlay-form-item">Starting:
          <input placeholder="DD/MM/YYYY HH:MM" type="datetime-local" value={startTime.toISOString().substring(0, 16)} onChange={handleStartTimeChange}></input>
        </label>
        <label className="expanded-profile-overlay-form-item">Ending:
          <input placeholder="DD/MM/YYYY HH:MM" type="datetime-local" value={endTime.toISOString().substring(0, 16)} onChange={handleEndTimeChange}/>
        </label>
        <label className="expanded-profile-overlay-form-item">Country:
          <input placeholder="Country" value={country} onChange={handleCountryChange}></input>
        </label>
        <label className="expanded-profile-overlay-form-item">City:
          <input placeholder="City" value={city} onChange={handleCityChange}></input>
        </label>
        <label className="expanded-profile-overlay-form-item">Street:
          <input placeholder="123 Evergreen Terrace" value={streetAddress} onChange={handleStreetAddressChange}></input>
        </label>
        <label className="expanded-profile-overlay-form-item">Description:
          <input placeholder="Ex: The best open mic comedy night..." maxLength={2000} value={description} onChange={handleDescriptionChange}></input>
        </label>
        <div className="expanded-profile-overlay-submit">
          <button
            className="secondary-button"
            type="submit"
          >Create Gig</button>
        </div>
      </form>
    </div>

  );
}
