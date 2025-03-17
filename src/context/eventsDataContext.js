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
                    "Cartoon your way through biology! Unleash your creativity and turn everyday biological processes into fun, engaging stories and cartoons.",
                image: biotoon,
                date: "26 March 2025",
                time: "1:00 PM - 4:00 PM",
                venue: "Audi 6",
                teamSize: "1",
                prizes: "",
                evaluationScheme: "Anyone with the Registration form",
                OC: "Mayur Rastogi",
                OCContact: "7037386808",
                EC: "Dr. Ritu Sharma",
                ECContact: "",
                notes: ["", ""]
            },
            {
                title: "Tech Relay",
                description:
                    "TechRelay is an exciting relay-style event where participants solve tech questions and pass the challenge to their teammates, testing speed, knowledge, and teamwork.",
                image: techRelay,
                date: "26 March 2025",
                time: "1:00 PM - 4:00 PM",
                venue: "Adjacent to Vishveshwarya block",
                teamSize: "2 - 3",
                prizes: "Winner: Rs.1100, Runner-up: Rs.500",
                evaluationScheme: "First to reach the final destination wins the race.",
                OC: "Mayur Rastogi",
                OCContact: "7037386808",
                EC: "Kartikey Sharma",
                ECContact: "8864997581",
                notes: ["", ""]
            },
            {
                title: "Python Coding Challenge",
                description:
                    "Python Coding Challenge is a three-stage event where participants tackle code desecration, debug errors, and determine code outputs, testing their Python skills and problem-solving abilities.",
                image: pythonCodingChallenge,
                date: "27 March 2025",
                time: "10:00 AM - 3:00 PM",
                venue: "",
                teamSize: "1",
                prizes: "Winner: Rs.1100, Runner-up: Rs.500",
                evaluationScheme: "The One with the best output wins the challenge.",
                OC: "Mayur Rastogi",
                OCContact: "7037386808",
                EC: "Kartikey Sharma",
                ECContact: "8864997581",
                notes: ["", ""]
            },
            {
                title: "Robo Race",
                description:
                    "RoboRace is a thrilling competition where robots race using AI or remote control, testing speed, accuracy, and innovation. Popular in events like RoboCup , it showcases the future of smart machines in action!",
                image: roboRace,
                date: "27 March 2025",
                time: "10:00 AM - 4:00 PM",
                venue: "Ground in front of admin building",
                teamSize: "1",
                prizes: "",
                evaluationScheme: "Overcome all obstacles in min possible time",
                OC: "Mayur Rastogi",
                OCContact: "7037386808",
                EC: "Dr. Ritu Sharma",
                ECContact: "",
                notes: ["", ""]
            },
            {
                title: "PharmaNext",
                description:
                    "PharmaNext event is competitive platform designed to foster ground breaking advancements in Pharmaceutical Technology. The competition invites researchers, Startups to present innovative solutions in Formulation/ Cosmetics, Nutraceuticals, Analytics & Medical Devices. The participants will showcase their ideas to experts, gain mentorship and collaboration opportunities. The goal is to accelerate the development of novel technologies that improves healthcare outcomes.",
                image: pharmaNext,
                date: "27 March 2025",
                time: "10:00 AM - 4:00 PM",
                venue: "Expo Stalls",
                teamSize: "1",
                prizes: "",
                evaluationScheme: "U.G/ P.G. students. Each team must contain max. 4 students and shortlisting for the final presentation will be based on the project description video. Submission requirements: A detailed proposal pitch video outlining the problem, solution, impact.",
                OC: "Mayur Rastogi",
                OCContact: "7037386808",
                EC: "Dr. Ritu Sharma",
                ECContact: "",
                notes: ["", ""]
            },
            {
                title: "Tech Debate",
                description:
                    "Tech Debate is a dynamic event where teams discuss and debate the pros and cons of trending technology topics, promoting critical thinking and diverse perspectives.",
                image: techDebate,
                date: "28 March 2025",
                time: "11:00 AM - 1:00 PM",
                venue: "Idea Lab",
                teamSize: "2",
                prizes: "Winner: Rs.1100, Runner-up: Rs.500",
                evaluationScheme: "Fluency, Facts and Figures, Communication skills, Active Listening",
                OC: "Mayur Rastogi",
                OCContact: "7037386808",
                EC: "Kartikey Sharma",
                ECContact: "8864997581",
                notes: ["", ""]
            },
            {
                title: "Drone Flying",
                description:
                    "Drone Race is an exciting competition where drones, controlled by AI or pilots, fly through tricky tracks at high speed. It tests skill, precision, and technology, making it a fun way to explore the future of flying robots!",
                image: droneFlying,
                date: "28 March 2025",
                time: "11:00 AM - 1:00 PM",
                venue: "Ground in front of admin building",
                teamSize: "1",
                prizes: "",
                evaluationScheme: "Overcome all obstacles in min possible time",
                OC: "Mayur Rastogi",
                OCContact: "7037386808",
                EC: "Dr. Ritu Sharma",
                ECContact: "",
                notes: ["", ""]
            },
        ],
        cultural: [
            {
                title: "Foxtrot",
                description:
                    "Step into rhythm, glide with grace—Foxtrot is not just a dance, it's a story in motion! Whether you own the stage solo, flow in a duet, or shine in a group, let the music lead you!",
                image: foxtrot,
                date: "27 March 2025",
                time: "2:00 PM - 4:00 PM",
                venue: "Main Stage, Auditions - Audi-5",
                teamSize: "Solo, Duet, Group: Min 6",
                prizes: "",
                evaluationScheme: "",
                OC: "Mahi",
                OCContact: "8700467603",
                EC: "Dr. Ritu Sharma",
                ECContact: "",
                notes: ["", ""]
            },
            {
                title: "Swar Sangam",
                description:
                    "Swar Sangam is a singing event which includes solo, duet and group performances. Participants are requested to register before closing date.",
                image: swarSangam,
                date: "26 March 2025",
                time: "11:30 AM - 1:30 PM",
                venue: "Main Stage (Event Stage)  Auditions- Audi-5",
                teamSize: "1",
                prizes: "",
                evaluationScheme: "",
                OC: "Mahi",
                OCContact: "8700467603",
                EC: "Dr. Ritu Sharma",
                ECContact: "",
                notes: ["", ""]
            },
            {
                title: "Battle of Bands",
                description:
                    "Battle of bands is the musical event which includes performances of bands.",
                image: battleOfBands,
                date: "27 March 2025",
                time: "2:30 PM - 5:00 PM",
                venue: "Main Stage (Event Stage)  Auditions- Audi-5",
                teamSize: "1",
                prizes: "",
                evaluationScheme: "",
                OC: "Mahi",
                OCContact: "8700467603",
                EC: "Dr. Ritu Sharma",
                ECContact: "",
                notes: ["", ""]
            },
            {
                title: "Rangmanch - Skit/Nukkad Natak",
                description: "",
                image: rangmanch,
                date: "28 March 2025",
                time: "11:00 AM - 12:30 PM",
                venue: "Main Stage (Event Stage)  Auditions- Audi-5",
                teamSize: "1",
                prizes: "",
                evaluationScheme: "",
                OC: "Mahi",
                OCContact: "8700467603",
                EC: "Dr. Ritu Sharma",
                ECContact: "",
                notes: ["", ""]
            },
            {
                title: "Spotlight show - Open Mic",
                description:
                    "Spotlight show is an event which provide opportunity to every individual to perform any activity like singing, dancing, poetry etc.",
                image: spotlightShow,
                date: "28 March 2025",
                time: "12:15 PM - 2:00 PM",
                venue: "Main Stage (Event Stage)  Auditions- Audi-5",
                teamSize: "1",
                prizes: "",
                evaluationScheme: "",
                OC: "Mahi",
                OCContact: "8700467603",
                EC: "Dr. Ritu Sharma",
                ECContact: "",
                notes: ["", ""]
            },
        ],
        creativity: [
            {
                title: "Ecstasy",
                description:
                    "Ecstasy is ramp walk event. Judges will decide the winner according to the performance in ramp walk itself.",
                image: rampSaga,
                date: "26 March 2025",
                time: "5:00 PM - 6:30 PM",
                venue: "Main Stage, Auditions - Audi-5",
                teamSize: "1",
                prizes: "",
                evaluationScheme: "",
                OC: "Kashish Sharma",
                OCContact: "9258817121",
                EC: "",
                ECContact: "",
                notes: ["", ""]
            },
            {
                title: "Cook-No-Flame",
                description:
                    "Participants are required to make the dishes without using the flame.",
                image: firelessCooking,
                date: "26 March 2025",
                time: "1:00 PM - 3:00 PM",
                venue: "Raman basement room under auditorium 3",
                teamSize: "1 - 2",
                prizes: "",
                evaluationScheme: "",
                OC: "Kashish Sharma",
                OCContact: "9258817121",
                EC: "Vanshika Vashishth",
                ECContact: "7217325226",
                notes: ["", ""]
            },
            {
                title: "Live Sketching",
                description:
                    "Participants are required to click the picture of their desired location or scenery and then draw it on the provided A3 sheet.",
                image: livePainting,
                date: "26 March 2025",
                time: "2:00 PM - 4:00 PM",
                venue: "Idea lab",
                teamSize: "1",
                prizes: "",
                evaluationScheme: "",
                OC: "Kashish Sharma",
                OCContact: "9258817121",
                EC: "Vishal Jain",
                ECContact: "6397151942",
                notes: ["", ""]
            },
            {
                title: "Pitch perfect",
                description:
                    "Students will be asked to pitch about their Idea in the first round and then for the second round the team will provide them the topic about which they will have to pitch.",
                image: pitchPerfect,
                date: "27 March 2025",
                time: "10:00 AM - 4:00 PM",
                venue: "",
                teamSize: "1 - 3",
                prizes: "",
                evaluationScheme: "",
                OC: "Kashish Sharma",
                OCContact: "9258817121",
                EC: "Stuti Kumar",
                ECContact: "7906274257",
                notes: ["", ""]
            },
            {
                title: "Blindfold Makeup",
                description:
                    "Participant are required to bring the partner whom they would apply makeup while being blindfolded.",
                image: blindfoldMakeup,
                date: "28 March 2025",
                time: "10:00 AM - 12:00 PM",
                venue: "",
                teamSize: "2",
                prizes: "",
                evaluationScheme: "",
                OC: "Kashish Sharma",
                OCContact: "9258817121",
                EC: "Lucky Tomar",
                ECContact: "9193107757",
                notes: ["", ""]
            },
            {
                title: "Artmania - Wall Painting",
                description:
                    "Artmania is an event of wall painting which includes a theme according to which participants will draw accordingly.",
                image: artmania,
                date: "",
                time: "",
                venue: "",
                teamSize: "",
                prizes: "",
                evaluationScheme: "",
                OC: "Kashish Sharma",
                OCContact: "9258817121",
                EC: "",
                ECContact: "",
                notes: ["", ""]
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
                teamSize: "1",
                prizes: "",
                evaluationScheme: "",
                OC: "Dr. Ritu Sharma",
                OCContact: "",
                EC: "Dr. Ritu Sharma",
                ECContact: "",
                notes: ["", ""]
            },
            {
                title: "Extempore",
                description:
                    "To test and develop a participant's ability to think and speak on a given topic spontaneously and coherently.",
                image: extempore,
                date: "26 March 2025",
                time: "12:00 AM - 1:30 PM",
                venue: "",
                teamSize: "1",
                prizes: "",
                evaluationScheme: "",
                OC: "Dr. Ritu Sharma",
                OCContact: "",
                EC: "Dr. Ritu Sharma",
                ECContact: "",
                notes: ["", ""]
            },
            {
                title: "Business Plan",
                description:
                    "To create a strategic roadmap for sustainable growth and success.",
                image: businessPlan,
                date: "26 March 2025",
                time: "2:00 PM - 4:00 PM",
                venue: "",
                teamSize: "1",
                prizes: "",
                evaluationScheme: "",
                OC: "Dr. Ritu Sharma",
                OCContact: "",
                EC: "Dr. Ritu Sharma",
                ECContact: "",
                notes: ["", ""]
            },
            {
                title: "Business Quiz",
                description:
                    "To assess and enhance participants knowledge and understanding of various business concepts, practices, and real-world applications.",
                image: businessQuiz,
                date: "27 March 2025",
                time: "10:00 AM - 11:30 AM",
                venue: "",
                teamSize: "1",
                prizes: "",
                evaluationScheme: "",
                OC: "Dr. Ritu Sharma",
                OCContact: "",
                EC: "Dr. Ritu Sharma",
                ECContact: "",
                notes: ["", ""]
            },
            {
                title: "Collage Making",
                description:
                    "To provide a creative platform for individuals to express their ideas, emotions, or concepts by assembling different materials, images, or objects.",
                image: collageMaking,
                date: "27 March 2025",
                time: "12:00 PM - 2:00 PM",
                venue: "",
                teamSize: "1",
                prizes: "",
                evaluationScheme: "",
                OC: "Dr. Ritu Sharma",
                OCContact: "",
                EC: "Dr. Ritu Sharma",
                ECContact: "",
                notes: ["", ""]
            },
        ],
    };

    return (
        <eventsDataContext.Provider value={{ activities }}>
            {children}
        </eventsDataContext.Provider>
    );
};