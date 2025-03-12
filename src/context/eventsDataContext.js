"use client"
import { createContext } from 'react';
import biotoon from "@/assets/technical/biotoon.jpg";
import techRelay from "@/assets/technical/tech_relay.jpg";
import pythonCodingChallenge from "@/assets/technical/python_coding_challenge.jpg";
import roboRace from "@/assets/technical/robo_race.jpg";
import pharmaNext from "@/assets/technical/pharmaNext.jpg";
import techDebate from "@/assets/technical/tech_debate.jpg";
import droneFlying from "@/assets/technical/drone_flying.jpg";
import foxtrot from "@/assets/cultural/foxtrot.jpg";
import swarSangam from "@/assets/cultural/swar_sangam.jpg";
import rampSaga from "@/assets/cultural/ramp_saga.jpg";
import battleOfBands from "@/assets/cultural/battle_of_bands.jpg";
import rangmanch from "@/assets/cultural/rangmanch.jpg";
import spotlightShow from "@/assets/cultural/spotlight_show.jpg";
import artmania from "@/assets/cultural/artmania.jpg";
import firelessCooking from "@/assets/creativity/fireless_cooking.jpg";
import livePainting from "@/assets/creativity/live_painting.jpg";
import pitchPerfect from "@/assets/creativity/pitch_perfect.jpg";
import blindfoldMakeup from "@/assets/creativity/blindfold_makeup.jpg";
import adMadShow from "@/assets/management/ad_mad_show.jpg";
import extempore from "@/assets/management/extempore.jpg";
import businessPlan from "@/assets/management/business_plan.jpg";
import businessQuiz from "@/assets/management/business_quiz.jpg";
import collageMaking from "@/assets/management/collage_making.jpg";

export const eventsDataContext = createContext();
export const EventsDataProvider = ({ children }) => {

    const activities = {
        technical: [
            {
                title: "Biotoon Event",
                description:
                    "Bio-Toon: Cartoon your way through biology! Unleash your creativity and turn everyday biological processes into fun, engaging stories and cartoons.",
                image: biotoon,
                date: "26 March 2025",
                time: "1:00 PM - 4:00 PM",
                venue: "Audi 6",
                registrationPeriod: "",
                prizes: "",
                eligibility: "Anyone with the Registration form",
                rules: ["1.", "2."],
            },
            {
                title: "Tech Relay",
                description:
                    "TechRelay is an exciting relay-style event where participants solve tech questions and pass the challenge to their teammates, testing speed, knowledge, and teamwork.",
                image: techRelay,
                date: "26 March 2025",
                time: "1:00 PM - 4:00 PM",
                venue: "Adjacent to 1st year building",
                registrationPeriod: "",
                prizes: "",
                eligibility: "First to Reach, Wins",
                rules: ["1.", "2."],
            },
            {
                title: "Python Coding Challenge",
                description:
                    "Python Coding Challenge is a three-stage event where participants tackle code desecration, debug errors, and determine code outputs, testing their Python skills and problem-solving abilities.",
                image: pythonCodingChallenge,
                date: "27 March 2025",
                time: "10:00 AM - 4:00 PM",
                venue: "Audi 4",
                registrationPeriod: "",
                prizes: "",
                eligibility: "The One with the best Pitch Wins",
                rules: ["1.", "2."],
            },
            {
                title: "Robo Race",
                description:
                    "RoboRace is a thrilling competition where robots race using AI or remote control, testing speed, accuracy, and innovation. Popular in events like RoboCup , it showcases the future of smart machines in action!",
                image: roboRace,
                date: "27 March 2025",
                time: "10:00 AM - 4:00 PM",
                venue: "Ground in front of admin building",
                registrationPeriod: "",
                prizes: "",
                eligibility: "Overcome all obstacles in min possible time",
                rules: ["1.", "2."],
            },
            {
                title: "PharmaNext",
                description:
                    "PharmaNext event is competitive platform designed to foster ground breaking advancements in Pharmaceutical Technology. The competition invites researchers, Startups to present innovative solutions in Formulation/ Cosmetics, Nutraceuticals, Analytics & Medical Devices. The participants will showcase their ideas to experts, gain mentorship and collaboration opportunities. The goal is to accelerate the development of novel technologies that improves healthcare outcomes.",
                image: pharmaNext,
                date: "27 March 2025",
                time: "10:00 AM - 4:00 PM",
                venue: "Expo Stalls",
                registrationPeriod: "",
                prizes: "",
                eligibility: "U.G/ P.G. students. Each team must contain max. 4 students and shortlisting for the final presentation will be based on the project description video. Submission requirements: A detailed proposal pitch video outlining the problem, solution, impact.",
                rules: ["1.", "2."],
            },
            {
                title: "Tech Debate",
                description:
                    "Tech Debate is a dynamic event where teams discuss and debate the pros and cons of trending technology topics, promoting critical thinking and diverse perspectives.",
                image: techDebate,
                date: "28 March 2025",
                time: "11:00 AM - 1:00 PM",
                venue: "Idealab",
                registrationPeriod: "",
                prizes: "",
                eligibility: "Fluency, Facts and Figures, Communication skills, Active Listening",
                rules: ["1.", "2."],
            },
            {
                title: "Drone Flying",
                description:
                    "Drone Race is an exciting competition where drones, controlled by AI or pilots, fly through tricky tracks at high speed. It tests skill, precision, and technology, making it a fun way to explore the future of flying robots!",
                image: droneFlying,
                date: "28 March 2025",
                time: "11:00 AM - 1:00 PM",
                venue: "Ground in front of admin building",
                registrationPeriod: "",
                prizes: "",
                eligibility: "Overcome all obstacles in min possible time",
                rules: ["1.", "2."],
            },
        ],
        cultural: [
            {
                title: "Foxtrot (Dance Event)",
                description:
                    "Foxtrot is a dancing event which includes solo, duet and group performances.",
                image: foxtrot,
                date: "27 March 2025",
                time: "2:10 PM - 4:20 PM",
                venue: "Main Stage (Event Stage)  Auditions- Audi-5",
                registrationPeriod: "",
                prizes: "",
                eligibility: "",
                rules: ["1.", "2."],
            },
            {
                title: "Singing (Swar Sangam)",
                description:
                    "Swar Sangam is a singing event which includes solo, duet and group performances. Participants are requested to register before closing date.",
                image: swarSangam,
                date: "26 March 2025",
                time: "11:30 AM - 1:30 PM",
                venue: "Main Stage (Event Stage)  Auditions- Audi-5",
                registrationPeriod: "",
                prizes: "",
                eligibility: "",
                rules: ["1.", "2."],
            },
            {
                title: "Fashion Show (Ramp Saga)",
                description:
                    "Ramp saga is ramp walk event. Judges will decide the winner according to the performance in ramp walk itself.",
                image: rampSaga,
                date: "26 March 2025",
                time: "5:00 PM - 6:30 PM",
                venue: "Main Stage (Event Stage)  Auditions- Audi-5",
                registrationPeriod: "",
                prizes: "",
                eligibility: "",
                rules: ["1.", "2."],
            },
            {
                title: "Battle of Bands",
                description:
                    "Battle of bands is the musical event which includes performances of bands.",
                image: battleOfBands,
                date: "27 March 2025",
                time: "2:30 PM - 5:00 PM",
                venue: "Main Stage (Event Stage)  Auditions- Audi-5",
                registrationPeriod: "",
                prizes: "",
                eligibility: "",
                rules: ["1.", "2."],
            },
            {
                title: "Rangmanch (Skit/Nukkad Natak)",
                description: "",
                image: rangmanch,
                date: "28 March 2025",
                time: "11:00 AM - 12:30 PM",
                venue: "Main Stage (Event Stage)  Auditions- Audi-5",
                registrationPeriod: "",
                prizes: "",
                eligibility: "",
                rules: ["1.", "2."],
            },
            {
                title: "Open Mic (Spotlight show)",
                description:
                    "Spotlight show is an event which provide opportunity to every individual to perform any activity like singing, dancing, poetry etc.",
                image: spotlightShow,
                date: "28 March 2025",
                time: "12:15 PM - 2:00 PM",
                venue: "Main Stage (Event Stage)  Auditions- Audi-5",
                registrationPeriod: "",
                prizes: "",
                eligibility: "",
                rules: ["1.", "2."],
            },
            {
                title: "Wall Painting (Artmania)",
                description:
                    "Artmania is an event of wall painting which includes a theme according to which participants will draw accordingly.",
                image: artmania,
                date: "28 March 2025",
                time: "",
                venue: "Main Stage (Event Stage)  Auditions- Audi-5",
                registrationPeriod: "",
                prizes: "",
                eligibility: "",
                rules: ["1.", "2."],
            },
        ],
        creativity: [
            {
                title: "Fireless cooking",
                description:
                    "Participants are required to make the dishes without using the flame",
                image: firelessCooking,
                date: "26 March 2025",
                time: "1:00 PM - 3:00 PM",
                venue: "Raman basement room under auditorium 3",
                registrationPeriod: "",
                prizes: "",
                eligibility: "",
                rules: ["1.", "2."],
            },
            {
                title: "Live Painting / sketching",
                description:
                    "Participants are required to click the picture of their desired location or scenery and then draw it on the provided A3 sheet.",
                image: livePainting,
                date: "26 March 2025",
                time: "2:00 PM - 4:00 PM",
                venue: "Idea lab",
                registrationPeriod: "",
                prizes: "",
                eligibility: "",
                rules: ["1.", "2."],
            },
            {
                title: "Pitch perfect",
                description:
                    "Students will be asked to pitch about their Idea in the first round and then for the second round the team will provide them the topic about which they will have to pitch",
                image: pitchPerfect,
                date: "27 March 2025",
                time: "10:00 AM - 4:00 PM",
                venue: "Audi 3 or 4 if available else idea lab",
                registrationPeriod: "",
                prizes: "",
                eligibility: "",
                rules: ["1.", "2."],
            },
            {
                title: "Blindfold makeup",
                description:
                    "Participant are required to bring the partner whom they would apply makeup while being blindfolded",
                image: blindfoldMakeup,
                date: "28 March 2025",
                time: "10:00 AM - 12:00 PM",
                venue: "Ground beside first year building / basketball ground",
                registrationPeriod: "",
                prizes: "",
                eligibility: "",
                rules: ["1.", "2."],
            },
        ],
        management: [
            {
                title: "Ad-mad Show",
                description:
                    "An Ad Mad Competition is a fun and creative event where participants create and present advertisements for products or services.",
                image: adMadShow,
                date: "26 March 2025",
                time: "10:00 AM - 11:30 AM",
                venue: "",
                registrationPeriod: "",
                prizes: "",
                eligibility: "",
                rules: ["1.", "2."],
            },
            {
                title: "Extempore",
                description:
                    "To test and develop a participant's ability to think and speak on a given topic spontaneously and coherently.",
                image: extempore,
                date: "26 March 2025",
                time: "12:00 AM - 1:30 PM",
                venue: "",
                registrationPeriod: "",
                prizes: "",
                eligibility: "",
                rules: ["1.", "2."],
            },
            {
                title: "Business Plan",
                description:
                    "To create a strategic roadmap for sustainable growth and success.",
                image: businessPlan,
                date: "26 March 2025",
                time: "2:00 PM - 4:00 PM",
                venue: "",
                registrationPeriod: "",
                prizes: "",
                eligibility: "",
                rules: ["1.", "2."],
            },
            {
                title: "Business Quiz",
                description:
                    "To assess and enhance participants knowledge and understanding of various business concepts, practices, and real-world applications.",
                image: businessQuiz,
                date: "27 March 2025",
                time: "10:00 AM - 11:30 AM",
                venue: "",
                registrationPeriod: "",
                prizes: "",
                eligibility: "",
                rules: ["1.", "2."],
            },
            {
                title: "Collage Making",
                description:
                    "To provide a creative platform for individuals to express their ideas, emotions, or concepts by assembling different materials, images, or objects.",
                image: collageMaking,
                date: "27 March 2025",
                time: "12:00 PM - 2:00 PM",
                venue: "",
                registrationPeriod: "",
                prizes: "",
                eligibility: "",
                rules: ["1.", "2."],
            },
        ],
    };

    return (
        <eventsDataContext.Provider value={{ activities }}>
            {children}
        </eventsDataContext.Provider>
    );
};