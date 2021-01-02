---
title: "2020 in Review"
excerpt: "A recap."
date: "2020-12-31"
tags: ["year-in-review"]
---

## Personal

At the end of February, I moved from the Bay Area out to Golden in Colorado. Golden is right at the
base of the foothills of the Rockies, giving fantastic access to the mountains. The goal was to take
advantage of the excellent access to cycling, mountain biking, rock climbing and hiking, all
available right from the front-door.

I had two international trips planned this year: a cycling trip with my partner to the French alps
through a cycle touring company, with a long weekend with some friends living in Zurich after, and
my usual trip home to visit my family for Christmas. Neither of these were able to go ahead. We were
able to postpone the cycling trip by a year, so fingers-crossed we can get vaccinated in time for
this summer.

## Work

I continued to work with a team spread between the Bay Area, Seattle and New York, so I was
expecting a bit of an adjustment, though in the end I wasn't the only one. We have an office in
downtown Denver that I was able to use twice before the lockdown began. Since then, I've been
working from our one-bedroom apartment, the other end of the room from my partners desk. It is not
an idea workplace. I've discovered that I'm not a work-from-home type of person. I need the
separation of work and life to be spelled out with some geography. By the later half of the year,
for extended stretches of meetings, or when interviewing candidates where I wanted to minimize
disruption, I took to a make-shift standing desk in our bedroom.

My role expanded during the year to include managing three of the people on my team, along with
someone on a different team but based in Denver. It's given me a new respect for people who are able
to manage five or six people, run a team, and still contribute meaningful code. Incorporating this
new set of responsibilities has been challenging and quite interesting. Typically, when deciding
what to work on, I would follow my engineering and product instincts: what's the most important
thing that needs to be done to further the product. This is something I'd say I'm pretty good at.
Sometimes it was fixing open issue, other times adding features, or investing in tech-debt that
would prevent flexibility in the future. I feel like over the past year I've done a decent job in
stretching these instincts to include the other responsibilities of leading the team, such as
communicating priorities, organizing the work of others:note[1], collaboration with other teams,
working with customers, and so on. I've started to work on expanding the balancing act to include
the growth of my direct reports, especially where their growth may trade-off against furthering the
product or have a longer time-horizon in terms of positive impact on the product.

## Projects

With the blurring of work and home life, working on any technical side-projects has felt a bit too
close to home. As a result I've not put as much time as I'd like into exploring new and interesting
tech. The three projects I have toyed with have all been in the form of self-hosting and building a
few websites.

The first is an
[online version of a card game called Turbo Hearts](https://play.anti.run/lobby):note[Back in Palo
Alto, we'd play a hand or two over lunch every day, so COVID necessitated a virtual version to keep
this tradition alive.] mostly built by two colleagues, I pitched in on a few aspects of the UI and
set up the hosting, including an OAuth service:note[It was pretty hard to find a good, self-hosted
auth service with account creation and OAuth support. In the end, I went with FusionAuth] for those
who didn't want to use Google to authenticate.

Later in the year, as Google Play Music disappeared and was "replaced" by Youtube Music, I decided
to self-host an alternative to have control over my music library:note[Why not just use Spotify like
the rest of the world? A discussion for another time.]. Previously, my library was shared between my
desktop and laptop via iTunes using iTunes match:note[This has the wonderful flaw of replacing your
explicit tracks with censored alternatives.], and sync'd to Google Play Music for listening on the
go. My requirements for a replacement were pretty straight forward: stores my existing music
collection, last.fm scrobbling when listening on the desktop, and an android app that can download
music for offline listening:note[It's pretty common to lose internet connection when cycling out in
the hills]. I decided to self-host [Funkwhale](https://funkwhale.audio/). I hosted on a nano Linode
instance, and used Linode's object storage to host my library. It does a lot of what I need, and
though the mobile app is missing a few useful features, the server does also support the subsonic
protocol so there's a lot of optionality in terms of ways to connect to the instance. And of course
it's open-source and hackable, so I'm excited to dig in further and add a few features that'd make
it a full replacement for my iTunes usage:note[Supporting star-based track ratings and play counts
would be the first two.].

Finally, this new site! I'll write more about the site, the inspiration and intent (more than just a
blog!) in the future, but for now I'm excited to have a place to put some writing, and to host
little experiments.

## Cycling

In 2020, I covered a little over 4k miles between my road bike and Zwift. This was more than 2019,
but not quite as many as 2017 or 2018. I did however climb around 420k feet, 50k more than my
previous record. Given my proximity to the mountains:note[Turn left out the front-door, and you're
climbing one!] this is hardly surprising. My biggest ride of the year was heading to the top of
Mount Evans:note[The highest paved road in North America] from home with two friends.

## Articles

// TODO

## [Books](https://www.goodreads.com/user/show/1855107-tim)

I didn't read as much as I had planned in 2020. I expected to have a daily commute, along with
monthly business trips with flights and nights in hotels which I typically fill with reading.
Without either of those, and with the work-life line becoming a blur as my commute became ten paces
from the bed, I finished less than half the number of books that I read in 2019. And, as usual, I
didn't read any books that came out in the year. The highlight book for me this year was 2014's "All
the Light We Cannot See" by Anthony Doerr, which lived up to the acclaim. The writing has a timeless
feel, a story set in WWII without feeling dated, achieved through Doerr's ability to avoid
flowery-complexity while still producing some of the most beautiful writing and turn of phrase.

## [Music](https://www.last.fm/user/Pixelzerox/library/albums?from=2020-01-01&to=2020-12-31)

An interesting year for music, with lots of stripped back lockdown-produced albums releasing in the
later half of the year. As usual,
[Gilles Peterson's weekly show](https://www.bbc.co.uk/programmes/b01fm4ss) was a great source for
new music from around the world. He also provided a
[fitting tribute](https://worldwidefm.net/show/mf-doom-in-tribute/) to the late MF DOOM. Artists
from my collection trending upward in my listens this year include Haken:note[Though their 2020
release Virus didn't excite me as much Vector. It seemed overly complicated, trying to make
references to multiple past albums, and didn't come together in a cohesive way like Vector or The
Mountain], Fleetwood Mac, and Laura Marling:note[Closely missed out on the top five list below, Song
For Our Daughter was fantastic]. As for new releases, here's a few words on my five favorites:

### Punisher by Phoebe Bridgers

It took me a few listens to warm to Punisher. It's an album that requires attention to appreciate,
something I failed to give it properly earlier in the year. Much of the beauty is in the slight,
gentle production. "Graceland Too", a sombre folk ballad, and "I Know The End", with it's
quiet-after-the-apocalypse chill followed by a build to the dramatic repetition of "the end is
here", cap the album perfectly.

### Shore by Fleet Foxes

Shore feels is a perfect amalgamation of the folkier, tender sound of his earlier releases with just
a touch of the more experimental sound of Crack-Up. It has an upbeat peacefulness to it, evoking
those end-of-the-summer days spent reminiscing about the summer just gone, while the days start to
get slightly longer, and the sunlight runs out half an hour earlier than you want it to.

### Lament by Touché Amoré

Raw, energetic, angsty. Listening to Lament feels like a release, like taking a load off. The
closer, "A Forecast", manages to be open and revealing about Jeremy's abandonment after the last
album whist opening as a surprisingly humorous ballad. A near perfect album.

### Unfold the God Man by Psychonaut

I'm very particular when it comes to anything with a post- or prog- prefix. A lot of the music in
the post- genres has such a homogenous feeling that it's hard to get passionate about individual
albums or tracks, I'd rather just throw on a post-rock playlist and enjoy the music as a background.
Often, a great prog- album only pays off when given time and attention, so I tend to stick to
old-faithfuls that I've already invested in and know back-to-front, or artists that I know will
reward my investment. With Unfold the God Man, the aggression grabs your attention out of the gate,
and doesn't let up. It's hard to listen without wanting to get physically involved. It manages to
draw influence from prog in song structure, without resorting to the often egregious displays of
technical mastery found in, say, a modern Haken album. Almost every track has the escalating build
of a great Tool track, though much like their latest album Fear Inoculum, it does occasionally cross
over the fine line between consistency and repetitiveness. Despite the 70-minute run time, each of
the nine tracks avoid overstaying their welcome, and I found myself playing the album through
back-to-back.

### RTJ4 by Run The Jewels

Musically, a tighter package than RTJ3. Lyrically, a perfect mix between brash rap bravado, and an
activist message that's more relevant that ever, a message only exacerbated by the tragic-irony of
it being recorded long before the killing of George Floyd and following protests for which, to me,
it became the soundtrack. "A Few Words For The Firing Squad (Radiation)" serves as the perfect
closers, a swelling, building, jazz-infused reflection on balancing family and their involvement in
social equality movements.
