# Objective
SSRental is a location-based rental platform designed to help users to 
    find rooms, apartments, office spaces, and business shutters near their location. 
    SSRental is a platform that connects room seekers(user) with room provider.

NOTE
SSRental charge some money from users(room seekers) to connect the room provider. By connecting user to the room provider SSRental at the first month it will charge some percentage like 5%, 10%

# Target Users
 1. Room Seekers
 2. Room Providers (Owners)

# User Roles features
 1. Room Seekers
    - Individuals can see spaces (single room, flats, offices, etc.)
    - Can browse the rooms & filter it by selecting location (ward no, street location), category, room type according to need
    - Seeker can also add properties (act as provider), but the default role is seeker
    - Can add blogs
    - Can add favourite to any properties for future to get the room
    - Can send inquiry message if any problem occurs

 2. Room Providers
    - Can add, delete the properties
    - Can add blogs, delete it can do all the things which room seekers do

 3. Admin
    - Can approve/reject, delete, the incoming properties which room provider have added. 
    - Can view properties before approving the properites all information should be shown up like (property creator, photos of property, all other details)
    - Can approve/reject, delete the blogs. If admin will do view section then all data should be shown up before approval like image, content, headings
    - Can block/unblock user
    - Can see the inquiry messages from users

# Important features for admin & user/room provider
- when adding properties
        - Title
        - MonthlyRent (less than 5,000. greater than 1,00,000 should not exceed) symbol should be रु not RS.
          & after every three zero add commas ok 
        - Bedrooms (dropdown 1,2,3,4,5)
        - Kitchens (dropdown 1,2,3,4,5)
        - Category (Single Room, 2/3 Rooms Flat, 1BHK, 2BHK, 3BHK, Office space, Business Shutter)
        - Floor (Ground Floor, 1st Floor, 2nd Floor, 3rd Floor, 4th Floor, 5th Floor)
        - Living Room (available, unavailable)
        - Tags (In tags there should be such keywords that is related to the title and when user search something then it should be shown in the UI)
        - Rent Design (Commercial, Residental, Business Shutter)
        - Description about property
        - Property Images (It should not file, PDF, video only images (JPG, img, jpeg))
        - Property location (Ward/Area, street) - Most important 
            - In property location we are targeting Particular location in nepal itahari only we are providing rooms. So In map only Ithari area all street any street ward user search then our platform should be capable to perform the task & show the location like google map where all things shows according to the location

# TECH STACK
1. Frontend - Next, React, Recharts, TailwindCSS, Typescript
2. Backend - Supabase (BAAS - Backend As A Service)
3. Database - PostgreSQL
