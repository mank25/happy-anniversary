Build a complete React (Vite) website.

PROJECT NAME:
"7 Years of Us"

IMPORTANT:
This should NOT look like an AI-generated love website.
It should feel handcrafted, premium, elegant, emotional and modern.

TECH STACK:

* React
* Vite
* Framer Motion
* React Router
* TailwindCSS
* Lucide Icons

CONTENT MANAGEMENT:
Create a single file:

src/data/content.json

ALL editable content must come from this JSON:

* Password
* Couple names
* Anniversary years
* Notes
* Milestones
* Photos
* Video URL
* Date proposal text
* Itinerary
* Colors
* Hero messages

No hardcoded content inside components.

DESIGN DIRECTION:

Theme:
Classic Modern Retro

Mood:

* Elegant
* Warm
* Nostalgic
* Premium
* Emotional

Color palette:

* Ivory (#F8F5F0)
* Warm Beige (#E7DDCF)
* Vintage Gold (#C8A76A)
* Charcoal (#2E2E2E)
* Deep Brown (#5B4636)

AVOID:

* Purple
* Neon colors
* Glitter effects
* Typical Valentine's design
* Cartoon hearts everywhere
* AI generated appearance

Typography:

* Playfair Display for headings
* Inter for body

Animations:

* Smooth fade transitions
* Gentle parallax
* Paper card hover effects
* Film reel style transitions
* Vintage camera flash effect between milestone sections

Mobile-first design.

---

PAGE 1
PASSWORD GATE
-------------

Full-screen entry experience.

Background:
Vintage paper texture with subtle grain.

Center card:

Heading:
"Enter the Love Password"

Subheading:
"Only true memories unlock this story."

Password input

Password:
2406/2019

When correct:
Make the password unlock a cinematic envelope-opening animation, then reveal the anniversary page. It makes the whole experience feel much more premium and personal.

Wrong password:
"Hmm... memory mismatch detected ❤️"

Button:
"Unlock Memories"

---

PAGE 2
ANNIVERSARY PAGE
----------------

Large hero section.

Headline:
"Happy 7th Anniversary"

Show uploaded photos in a premium collage.

Add floating polaroid style frames.

Display a heartfelt message:

"Seven years.
Countless memories.
Infinite laughter.
A little madness.
And somehow, every day, I choose you again."

Add continue button:
"Relive Our Journey"

Smooth transition.

---

PAGE 3
THE JOURNEY
-----------

Create a beautiful vertical timeline.

Each milestone appears as a premium retro memory card.

YEAR 2019
Title:
The Beginning

Description:
Initial feelings, secret dating and butterflies.

YEAR 2020
Title:
Goa & Corona

Description:
A memorable trip followed by an unforgettable year.

YEAR 2021
Title:
Through The Storm

Description:
Difficult times, stronger bond.

YEAR 2022
Title:
Long Distance Begins

Description:
Different cities, same heart.

YEAR 2023
Title:
Still Choosing Each Other

Description:
Ups, downs and endless effort.

YEAR 2024
Title:
Thailand Memories

Description:
Our most memorable adventure.

YEAR 2025
Title:
Back Together

Description:
Long distance ended. Same city again.

YEAR 2026
Title:
Still Writing The Story

Description:
Still loving, still struggling, still creating memories.

Each card:

* Year
* Photo
* Short note

Timeline should animate while scrolling.

At the end:

Text:
"No starting point.
No ending point.
Just xx days of choosing each other."

Days count should be automatically calculated from the anniversary date in JSON.

---

PAGE 4
CELEBRATION MISSION
-------------------

Fun final page.

Large heading:

"One Final Mission Pending..."

Then:

"To celebrate 7 years of surviving me,
would you like to go on a date?"

Buttons:

YES

NO

If YES:

Show animation.

Display:

"He said YES! ❤️"

Then reveal itinerary cards.

Example:

* Coffee
* Lunch
* Surprise Activity
* Sunset Walk
* Dinner

All editable from JSON.

If NO:

Button runs away slightly.

Then display:

"Boyfriend malfunctioning. Please restart and try again."

---

## EXTRA FEATURES

1. Music Toggle
   Small floating music player.

2. Memory Counter
   Live relationship days counter.

3. Film Grain Overlay

4. Loading Screen
   Vintage film projector animation.

5. Smooth page transitions

6. Scroll progress indicator

7. Fully responsive

8. Optimized image loading

9. Accessibility support

10. Dark mode disabled

---

## JSON STRUCTURE

Create content.json with structure:

{
"password": "2406/2019",
"couple": {
"partner1": "",
"partner2": ""
},
"anniversaryDate": "2019-06-24",
"anniversaryYears": 7,
"heroMessage": "",
"anniversaryMessage": "",
"photos": [],
"videoUrl": "",
"milestones": [],
"itinerary": [],
"music": "",
"theme": {
"primary": "",
"secondary": "",
"accent": ""
}
}

Generate complete production-ready code.
Create reusable components.
Use clean folder structure.
No placeholders except where content comes from JSON.
