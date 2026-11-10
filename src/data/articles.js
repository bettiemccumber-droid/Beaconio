import { ad, figure, h2, link, p, pair } from './rich';

/** Journal categories. A story can wear more than one. */
export const categories = [
  { name: 'Fashion', line: 'Clothes that survived a real week, not a lookbook.' },
  { name: 'Trends', line: 'What is moving, and what we are done chasing.' },
  { name: 'Food', line: 'Meals that made the desk kinder.' },
  { name: 'Lifestyle', line: 'The ordinary hours, looked at closely.' },
  { name: 'Reviews', line: 'Objects we kept after the return window.' },
  { name: 'Technology', line: 'Tools that earned a place in the week.' },
];

/** Stories filed between February 2025 and February 2026. */
export const articles = [
  {
    slug: 'stillroom-open-office',
    title: 'The Headphones That Made an Open Office Feel Private',
    standfirst:
      'I did not need silence. I needed the kettle, the stand-up, and Mara’s questions to sit two desks farther away.',
    excerpt:
      'A month with matte charcoal headphones, a bad cafe blender, and the particular mercy of not taking them off.',
    date: '2026-02-12',
    categories: ['Reviews', 'Technology', 'Lifestyle'],
    layout: 'feature',
    image: '/images/article-headphones.jpg',
    imageAlt: 'Matte charcoal over-ear headphones on a pale oak desk beside a closed laptop',
    author: 'Mara Ellison',
    role: 'Editor',
    readMinutes: 11,
    tags: ['headphones', 'audio', 'desk'],
    productSlug: 'stillroom-anc',
    verdict: {
      score: '8.6',
      summary: 'They stayed on the hook. The touch panel is the part I still argue with.',
    },
    sections: [
      p(
        'The fourth floor at Harbor Works is one room, twenty people, and a kettle that screams like it has been wronged. I answered that room for a year with the cheap earbuds from a drawer of dead cables. By eleven my ears hurt and I was doing that tight smile people do when they are pretending to listen. In November someone left a matte charcoal pair on my hook. The note said: try these, and stop sighing. I sighed. Then I put them on.',
      ),
      p(
        'They are the ',
        link('Stillroom ANC', '/products/stillroom-anc', 'mark'),
        '. Not light, despite what every product page on earth promises. They sit. After ten minutes you stop narrating the sitting. The cushions are a dull protein leather that does not go hot before lunch, which is a low bar and also the bar that matters. The yoke is a narrow steel arc. No gloss. No logo performing for the room.',
      ),
      figure(
        '/images/office-floor.jpg',
        'Charcoal headphones hanging on a hook in a bright open office',
        'The hook under the shelf. If they live in a case, I stop wearing them.',
        'wide',
      ),
      h2('The room, moved back', 'the-room'),
      p(
        'What I wanted was not a recording booth. Stillroom’s noise control is tuned for rooms, and I could tell by the second morning. The air system drops out. Voices do not vanish. They step back about two desks, which is exactly far enough that I can leave the headphones on when Jonah asks where the draft went. A pair that erases your colleagues is a pair you take off for every sentence. Then you stop wearing it, and you are back to the kettle.',
      ),
      p(
        'I wore them through a messy sprint we were tracking in ',
        link('Linear', 'https://linear.app', 'serif'),
        ', two train rides, and one cafe I will not name because the blender there has a personal grudge. On the train they are wonderful. In the cafe they are honest: the blender remains a blender, only farther off. I stopped expecting magic and liked them more. Battery life landed just under thirty hours with the noise control on, which I know because I forgot to charge them and they were still awake on Friday.',
      ),
      figure(
        '/images/train-quiet.jpg',
        'A traveler from behind on a morning train, wearing charcoal headphones',
        'Portland to Seattle, late, the good kind of late.',
        'right',
      ),
      p(
        'The case is a hard oval. It fits a tote. It does not fit a coat pocket, and I am done pretending I wanted it to. These are desk headphones that travel. The other way around is how you end up with a crushed pair and a story about airline bins.',
      ),
      ad('shelf', {
        label: 'Shelf note',
        title: 'Stillroom, if the floor is loud',
        text: 'We bought the charcoal pair for the studio. Nobody paid for the paragraph above. If your room is the problem, this is the object we actually hang up.',
        href: '/products/stillroom-anc',
        cta: 'See it on the shelf',
        image: '/images/product-headphones.jpg',
        imageAlt: 'Studio photograph of the Stillroom headphones',
        style: 'arrow',
      }),
      h2('The part I still resent', 'the-resentment'),
      p(
        'The touch panel on the right cup is fussier than a button. I have paused a voice note twice while shifting them, once in the middle of a sentence I was proud of. A single physical click would have been kinder. The cable, when you want one, lives in a felt pocket and feels like an apology. It is an apology. I use it at the desk when the battery finally gives up, which is rare enough that I forget the cable exists and then curse the pocket.',
      ),
      {
        type: 'ul',
        items: [
          'Calls are fine if you like the sound of your own slightly closer voice. The mic is clear. It is also near.',
          'The headband adjusts in real steps. Set it once, on a Tuesday, and leave it.',
          'Charge them when you charge the laptop. They will outlast your good intentions.',
        ],
      },
      {
        type: 'quote',
        text: 'Quiet that leaves people in the room is the only quiet I can keep.',
        cite: 'A note I wrote on the train and did not edit',
      },
      p(
        'I still take them off for lunch. That is the tell. Anything I wear through a sandwich is a costume. Stillroom comes off, goes on the hook, and is there when I sit back down. If you work in a room you cannot leave, I would hand you these before I handed you advice.',
      ),
    ],
  },
  {
    slug: 'harbor-28-four-cities',
    title: 'Twenty-Eight Liters, a Coat, and No Extra Shoes',
    standfirst:
      'I wanted a bag that did not turn a Thursday into a production. The olive one almost talked me out of packing cubes.',
    excerpt:
      'Four cities, one canvas pack, and the coat that had to come even when the forecast was wrong.',
    date: '2026-01-16',
    categories: ['Lifestyle', 'Fashion', 'Trends'],
    layout: 'diary',
    image: '/images/article-backpack.jpg',
    imageAlt: 'An olive canvas backpack on a worn leather train seat',
    author: 'Jonah Hale',
    role: 'Product editor',
    readMinutes: 10,
    tags: ['travel', 'coat', 'carry'],
    productSlug: 'harbor-28',
    verdict: {
      score: '8.4',
      summary: 'Right volume for two nights. Wrong bag if you pack for weather that is not happening.',
    },
    sections: [
      p(
        'I distrust bags with expedition in the name. They grow pockets the way a bad kitchen grows jars, and then you carry the pockets. ',
        link('Harbor 28', '/products/harbor-28', 'mark'),
        ' showed up in olive canvas with brass zippers and a number instead of a personality. Twenty-eight liters. I took it to Portland, then Chicago, then a friend’s spare room that smelled like radiator, then home on a train late enough to count as a fourth city.',
      ),
      figure(
        '/images/hotel-chair.jpg',
        'An olive backpack and a wool coat on a hotel chair',
        'The whole trip, minus the shirt I was wearing.',
        'left',
      ),
      p(
        'What fit: a 14-inch laptop in the sleeve, the headphone case, one knit, socks, the notebook, a wash bag, and the coat when the afternoon turned. The sleeve sits on the back panel and does not eat the bag. That sounds like a footnote. It is the difference between packing once and repacking in a hallway while someone holds the elevator.',
      ),
      h2('The coat was the argument', 'the-coat'),
      p(
        'Every trend piece this winter told me to buy a coat with architecture. I already own a camel wool one that looks like nothing in photographs and feels like a decision when I put it on. It came on the trip because the forecast was a liar and because I am vain in a specific, boring way. Harbor took it folded, not rolled into a comedy. Under the train seat the bag slides. On a shoulder it sits high enough that the coat still buttons. I took the sternum strap off on day two. It lived in the front pocket with a pastry I regretted.',
      ),
      p(
        'There is a whole conversation happening in places like ',
        link('The Guardian’s fashion desk', 'https://www.theguardian.com/fashion', 'quiet'),
        ' about quiet luxury, which mostly means expensive fabric photographed on a person who is not cold. I am cold. The coat is ten years old. The bag is new. Together they looked like I had meant to leave the house, which is the only look I trust.',
      ),
      p(
        'Chicago was the day the bag earned the number. I had a dinner I was underdressed for and a morning I was overdressed for, and the coat did both without a second bag appearing like a punchline. In the spare room I unpacked onto a chair and the chair looked like a person: coat, knit, the notebook, nothing else apologizing. Portland was wet enough that the canvas went almost black at the base. I left it by the radiator overnight and it was itself by coffee. No one at the station asked if I was doing a trip. I was doing a Thursday with a toothbrush in it. That is the volume I wanted, and I only learned the number by refusing to add the shoes.',
      ),
      figure(
        '/images/coat-street.jpg',
        'A person walking away in a long camel coat',
        'Chicago, too early, the coat doing the job the forecast would not.',
        'wide',
      ),
      ad('line', {
        label: 'A small push',
        text: 'If you are still borrowing a suitcase for two nights, the olive Harbor is the one hanging by our door. We paid for it. The strap we removed is still in the pocket, judging us.',
        href: '/products/harbor-28',
        cta: 'The pack, plainly',
        style: 'serif',
      }),
      h2('Where it gives up', 'gives-up'),
      {
        type: 'ul',
        items: [
          'The bottle pocket wants a slim bottle and resents a proud one.',
          'Canvas goes a darker olive in rain and dries without a speech. It is not a dry bag.',
          'If you need a second pair of shoes, you need a different trip.',
        ],
      },
      pair([
        {
          src: '/images/article-backpack.jpg',
          alt: 'The backpack on a train seat',
          caption: 'Under the seat. Not wedged. There is a difference.',
        },
        {
          src: '/images/product-backpack.jpg',
          alt: 'The olive pack in the studio',
          caption: 'Brass zippers, no slogan, no cubes required.',
        },
      ]),
      p(
        'I have hung it by the door since I got back. A suitcase makes a trip feel announced. This makes a Thursday feel possible. That is the review, and also why I stopped reading the coat roundups.',
      ),
    ],
  },
  {
    slug: 'northline-keyboard',
    title: 'A Keyboard You Forget Somewhere in the Second Paragraph',
    standfirst:
      'Most boards want an audience. This one wanted the sentence, and then it got out of the way.',
    excerpt:
      'Six weeks with a low, warm off-white board, and the small grief of going back to the laptop keys.',
    date: '2025-12-04',
    categories: ['Technology', 'Reviews'],
    layout: 'report',
    image: '/images/article-keyboard.jpg',
    imageAlt: 'A warm off-white compact keyboard on a linen desk mat',
    author: 'Jonah Hale',
    role: 'Product editor',
    readMinutes: 9,
    tags: ['keyboard', 'writing', 'desk'],
    productSlug: 'northline',
    verdict: {
      score: '8.8',
      summary: 'It disappeared into the work. Keep your light show somewhere else.',
    },
    sections: [
      p(
        'Mechanical keyboards are often hobbies that happen to produce letters. They want software, a theme, a little audience. ',
        link('Northline Compact', '/products/northline', 'mark'),
        ' arrived in warm off-white aluminum, low to the desk, and declined the hobby. I typed on it for six weeks. The interesting part is how little I thought about it after the first afternoon, which is a strange thing to admit in a review and also the whole point.',
      ),
      h2('A room, not a stage', 'not-a-stage'),
      figure(
        '/images/article-keyboard.jpg',
        'Close view of a low off-white keyboard beside a sprig of olive',
        'The olive was not required. The quiet was.',
        'wide',
      ),
      p(
        'The keys are slightly dampened. You feel the sentence. The open room does not have to. Mara works beside me and will mention a keyboard if it bothers her. She did not mention this one. I am choosing to treat that as data and not as luck. The layout keeps the arrows and drops the number pad. I have not needed a number pad for a draft, a budget note, or an apology email. I have needed the arrows every single day.',
      ),
      p(
        'There is a switch on the back for the other machine. There is no account. I did not download anything, and the typing did not get worse because of that. If you enjoy the ritual of a board that needs a driver, there are cathedrals for you on forums I will not link. I wanted to write. The ',
        link('lamp', '/products/lumen-arc', 'ink'),
        ' was already on. The board just had to not join the conversation.',
      ),
      p(
        'On the fourth Thursday I wrote a correction that had been sitting in my mouth since Monday. The keys did not make the correction braver. They did keep my shoulders where they were, which is more than I can say for the laptop, where I hunch as if the machine might run. I noticed the aluminum only when my wrists got cold and the board was warmer than the desk. That is a ridiculous detail and I am keeping it, because reviews usually skip the hour when you forget the object and remember the person you were writing to. His name is Jonah. He had the fact wrong, and I had let it stand because finding the sentence felt expensive. It was not expensive. It was a paragraph. The board stayed out of it.',
      ),
      ad('note', {
        label: 'From the desk drawer',
        title: 'Northline, for people who are tired of boards',
        text: 'Warm aluminum, no parade of lights, no software required to produce a paragraph. It is on the shelf because it stayed on the desk.',
        href: '/products/northline',
        cta: 'Read the object',
        style: 'mark',
      }),
      h2('Who should leave it', 'leave-it'),
      {
        type: 'ul',
        items: [
          'If your work lives on a number pad, buy a different shape and ignore me.',
          'If you want the keys to glow, you will be bored in the best and worst way.',
          'Heavy typists who like a tall, loud switch will find this too polite. They are not wrong. They are just not me.',
        ],
      },
      figure(
        '/images/product-keyboard.jpg',
        'The compact keyboard on a plain studio background',
        'Seventy-five percent. The percent I actually use.',
        'left',
      ),
      figure(
        '/images/evening-desk.jpg',
        'A lamp lit over a notebook at dusk',
        'The board lives just out of this frame, which feels correct.',
        'right',
      ),
      {
        type: 'quote',
        text: 'A tool can be finished. Not every object on a desk needs a version number.',
      },
      p(
        'I still have the laptop keyboard. I use it on the train, and I notice it now, which is new and slightly unkind. Northline did not make me faster. It made one less decision between the thought and the line. I will take that over a hobby.',
      ),
    ],
  },
  {
    slug: 'linear-quieter-roadmap',
    title: 'We Moved the Roadmap and Got Our Mondays Back',
    standfirst:
      'The calendar used to live in a document named FINAL-final. Priya put the living work somewhere with edges. Mondays got shorter.',
    excerpt:
      'A platform we actually open, and the rule that saved us from importing the junk drawer.',
    date: '2025-11-11',
    categories: ['Technology', 'Trends'],
    layout: 'report',
    image: '/images/article-linear.jpg',
    imageAlt: 'Hands at a laptop in a bright studio, the screen a soft blur of cards',
    author: 'Priya Raman',
    role: 'Platforms editor',
    readMinutes: 10,
    tags: ['linear', 'workflow', 'planning'],
    external: { label: 'Visit Linear', href: 'https://linear.app' },
    verdict: {
      score: '9.0',
      summary: 'The rare planning tool I open without bargaining with myself first.',
    },
    sections: [
      p(
        'Beaconio is not a software company. We are four people, a shelf, and a publishing calendar that used to live in a document with three colors and no owner. Every Monday the document had grown a tab. I put the quarter into ',
        link('Linear', 'https://linear.app', 'serif'),
        ' and gave the rest of us one rule: if it is not an issue, it is not work. People hated the rule for nine days. Then they used it to get out of meetings.',
      ),
      h2('What a Monday looks like now', 'monday'),
      figure(
        '/images/article-linear.jpg',
        'Hands typing at a standing desk, the screen softly blurred',
        'I will not show you our real board. You would see the typos.',
        'wide',
      ),
      p(
        'Stories are issues. A product on loan is an issue. A correction is an issue with a date, because corrections should not float around feeling ashamed. The cycle is two weeks, which matches how we actually ship notes, not how a growth team imagines a quarter. We stayed close to the defaults. The day a tool invites you to build a second tool inside it, this desk leaves. I have left nicer software for less.',
      ),
      p(
        'It is fast in the specific sense that the keyboard still works and the screen does not ask to be admired. Assigning a review and getting out takes less time than finding the right tab in the old document. Comments stay on the issue. We stopped pasting decisions into chat and losing them under a picture of someone’s dog. I like the dog. I do not like searching for the decision.',
      ),
      p(
        'The Monday I trust happened in the second cycle. Elise had a coat piece and a market piece and a feeling that both were almost. Almost is how our old document got its extra tab. I made her pick a verb: file the coat, or kill it. She filed it, dated the photographs, and the market piece moved a week without anyone performing disappointment. We still argued. The argument had a place to end. Afterward I walked to the kettle and did not reopen the board to check whether the argument was still happening. It was not. That small boredom is what I am recommending, not a screenshot of a tidy cycle.',
      ),
      ad('aside', {
        label: 'Worth the login',
        title: 'Linear, for a small desk',
        text: 'Use it for commitments. Keep the paper list for attention. The split is the recommendation, and the account is yours, not a placement.',
        href: 'https://linear.app',
        cta: 'Open Linear',
        style: 'arrow',
        external: true,
      }),
      h2('When I would not bother', 'when-not'),
      {
        type: 'ul',
        items: [
          'If you need a client portal, a wiki, and a roadmap for strangers, you want a wider suite. This one has edges on purpose.',
          'Unstructured research belongs somewhere gentler. We still keep references in Are.na. Linear wants a verb.',
          'Do not import your history. Start from the living quarter or you will rebuild the junk drawer with better fonts.',
        ],
      },
      figure(
        '/images/about-studio.jpg',
        'The studio table where the Monday list used to sprawl',
        'The paper list survived. It is shorter, which was the hope.',
        'left',
      ),
      figure(
        '/images/evening-desk.jpg',
        'A lamp over a notebook after the laptops are closed',
        'Evening. The board can stay shut. The day list is paper again.',
        'right',
      ),
      {
        type: 'quote',
        text: 'If it is not an issue, it is not work. The sentence did more than any template I have been sold.',
        cite: 'Priya, after the second quieter Monday',
      },
      p(
        'We still keep a paper list for the day. Linear holds what has to survive the day. Paper for attention, the tracker for commitment. I trust tools with edges. The fashionable ones without edges become another inbox, and I already have one of those.',
      ),
    ],
  },
  {
    slug: 'lumen-arc-task-light',
    title: 'Task Light, Not Furniture',
    standfirst:
      'The ceiling fixture was guilt. The brass lamp is for the hour the window gives up.',
    excerpt:
      'Evenings with a dimmable brass lamp, a heavy base, and no scenes to program.',
    date: '2025-10-08',
    categories: ['Lifestyle', 'Reviews'],
    layout: 'letter',
    image: '/images/article-lamp.jpg',
    imageAlt: 'A brass task lamp casting a warm pool of light on paper',
    author: 'Elise Cho',
    role: 'Field editor',
    readMinutes: 9,
    tags: ['lamp', 'evening', 'desk'],
    productSlug: 'lumen-arc',
    verdict: {
      score: '8.5',
      summary: 'We leave it on after the laptop closes. Too focused if you need to flood a studio.',
    },
    sections: [
      p(
        'Overhead lights are for warehouses and for people who have given up on a room. By October we were using the ceiling fixture out of guilt. I put a ',
        link('Lumen Arc', '/products/lumen-arc', 'mark'),
        ' on the evening desk: brushed brass, a weighted disc, an arm that stays where you leave it. The head dims on a slide. There are no named scenes. I did not want a lamp with moods. I wanted to see the page.',
      ),
      figure(
        '/images/article-lamp.jpg',
        'Brass lamp bent over a blank sheet of paper',
        'The pool is small. That is the compliment.',
        'wide',
      ),
      h2('A pool, not a flood', 'the-pool'),
      p(
        'The beam covers a page and a cup. A task lamp that lights the whole table is a small ceiling, and we had just escaped one. At a warm 2700K it does not pretend to be daylight. Morning belongs to the window. This object belongs to the hour the window retires, which in October is rude and early. I bumped the arm twice. It did not drift. That is the entire engineering requirement, and it met it without a speech.',
      ),
      p(
        'The base shares a table with the carafe without a negotiation. The brass does not mirror the room back at you. The cable is fabric-covered and long enough to reach the outlet that is never where a lamp designer imagines it. I have strong feelings about outlets. The lamp did not make them worse.',
      ),
      p(
        'Mara reads in the same room, and the old ceiling made both of us polite and slightly miserable. With the pool on the page, her side of the table stays dim enough to be a person and not a coworker under inspection. She asked me, once, to tilt it off her cup. I did. The arm stayed. We did not buy a second lamp to be fair, which would have turned a tool back into furniture. If you share a room, one honest pool is kinder than a fixture that flatters everyone and helps no one finish the line. I know because we lived the flattering year. The pages were brighter. The evenings were worse.',
      ),
      figure(
        '/images/evening-desk.jpg',
        'The lamp on at dusk beside an open notebook',
        'After the laptop. This is when it earns the table.',
        'right',
      ),
      ad('shelf', {
        label: 'Kept on',
        title: 'Lumen Arc, for the shared room',
        text: 'A tight warm pool, a base that does not wander, no app. If you light a whole studio for drawing, look elsewhere and do not let me talk you into this.',
        href: '/products/lumen-arc',
        cta: 'The lamp on the shelf',
        image: '/images/product-lamp.jpg',
        imageAlt: 'The brass task lamp in the studio',
        style: 'ink',
      }),
      {
        type: 'ul',
        items: [
          'Good for reading, editing, and the last pass on a printed draft.',
          'Dim it lower than you think. The second step down is when the room exhales.',
          'Do not buy it to light a photoshoot. The pool is honest and small and will embarrass you.',
        ],
      },
      figure(
        '/images/product-lamp.jpg',
        'The adjustable brass lamp on a plain background',
        'It looks like furniture until you turn it on. Then it is a tool.',
        'left',
      ),
      p(
        'We stopped switching the ceiling on after four. The lamp is furniture only in the sense that it stays. In use it is closer to a good pencil: specific, warm, and slightly nicer than the job requires. I leave it on when I go to the kettle. The room looks decided. That is a small thing and I wanted it.',
      ),
    ],
  },
  {
    slug: 'camel-coat-that-stayed',
    title: 'The Coat I Stopped Apologizing For',
    standfirst:
      'It is camel, wool, and ten years old. The new coats wanted a narrative. This one wanted October.',
    excerpt:
      'A coat that is not a trend, worn until the cuffs went soft, and the linen shirt underneath that keeps showing up.',
    date: '2025-08-19',
    categories: ['Fashion', 'Trends', 'Lifestyle'],
    layout: 'gallery',
    image: '/images/coat-street.jpg',
    imageAlt: 'A person in a long camel coat walking away down a morning street',
    author: 'Elise Cho',
    role: 'Field editor',
    readMinutes: 11,
    tags: ['coat', 'linen', 'fashion'],
    verdict: {
      score: '8.9',
      summary: 'Not for sale on our shelf. Still the most useful garment in the room.',
    },
    sections: [
      p(
        'I bought the coat in a shop that no longer exists, on a day I was supposed to be somewhere else. Camel wool, nothing clever, a lining the color of weak tea. For years I apologized for it. Too plain. Too long. Not the coat the season was having. Then I wore it on a Tuesday when the wind came up off the river, and I stopped explaining it to people who were not cold.',
      ),
      pair([
        {
          src: '/images/coat-chair.jpg',
          alt: 'A camel wool coat draped on a wooden chair',
          caption: 'Where it lives between wearings. Not on a hanger with a speech.',
        },
        {
          src: '/images/linen-cuff.jpg',
          alt: 'Close view of an oatmeal linen cuff',
          caption: 'The shirt under it. Wrinkled on purpose, then wrinkled by accident.',
        },
      ]),
      h2('Trend is a weather report', 'weather-report'),
      p(
        'This year the photographs wanted coats with shoulders that could park a bicycle. I tried one on. I looked like I was late to a play. The camel one does not photograph well, which I have decided is a moral advantage. You can scroll ',
        link('a season of coats', 'https://www.theguardian.com/fashion', 'quiet'),
        ' and feel briefly that your closet is a failure. Then you walk to the train and remember your closet has a job.',
      ),
      p(
        'Under it I keep wearing the same oatmeal linen shirt. The cuff is soft where the watch used to be, before I gave the watch up as another thing to check. Linen wrinkles. I used to iron it for meetings that did not deserve ironing. Now I shake it and go. Nobody has mentioned the wrinkles. They have mentioned that I look like I slept, which I did.',
      ),
      p(
        'The shop was on a side street that now sells candles in jars with feelings. The woman who sold me the coat did not say investment. She said it would last past the lining, and the lining would last past my patience, and then she took cash and went back to a radio play. I have had the lining mended once, at a place that also does trousers, by a man who did not ask what the coat meant. It means October. It means I can carry the notebook, a peach if I am lucky, and my hands in the pockets without looking armed by a silhouette. When a newer coat tempts me, I put this one on inside the shop and stand there until the temptation gets bored. It usually does. I am vain, but I am also late, and late is a better editor than a lookbook.',
      ),
      figure(
        '/images/coat-street.jpg',
        'Walking away in the camel coat on a quiet sidewalk',
        'I will not turn around for the picture. The coat is better from here.',
        'wide',
      ),
      ad('line', {
        label: 'Not a coat ad',
        text: 'We do not sell the coat. We do sell the notebook that lives in its pocket, because I got tired of losing scraps of paper in the lining.',
        href: '/products/keepsake',
        cta: 'The pocket notebook',
        style: 'mark',
      }),
      h2('What I will not buy this season', 'will-not'),
      {
        type: 'ul',
        items: [
          'A coat that needs a belt to have a point of view.',
          'Shoes I cannot walk to the market in. The market is the test. The party is the exception.',
          'Anything described as a statement. I am already making enough of those by accident.',
        ],
      },
      figure(
        '/images/pencil-pocket.jpg',
        'A notebook and pencil in a wool coat pocket',
        'The pocket, doing more work than the silhouette.',
        'right',
      ),
      {
        type: 'quote',
        text: 'If I am still wearing it in March, it was never a trend. It was a coat.',
      },
      p(
        'Fashion, when it is kind, is just the record of what you reached for when you were late. I reach for this. The cuffs of the shirt show. The hem hits where it hits. I look like myself, which is not a campaign, and is the only thing I want to look like before nine.',
      ),
    ],
  },
  {
    slug: 'pocket-notebook-guide',
    title: 'The Notebook That Stayed in the Coat',
    standfirst:
      'People buy notebooks for the person they plan to become. The person who leaves the house needs a book that fits a pocket and forgives a pencil.',
    excerpt:
      'Four checks before you spend the money, and the cream set that passed them by getting scuffed.',
    date: '2025-06-27',
    categories: ['Lifestyle', 'Reviews'],
    layout: 'diary',
    image: '/images/article-notebook.jpg',
    imageAlt: 'A cream pocket notebook and pencil on a cafe table beside a wool coat',
    author: 'Elise Cho',
    role: 'Field editor',
    readMinutes: 10,
    tags: ['notebook', 'paper', 'pocket'],
    productSlug: 'keepsake',
    verdict: {
      score: '8.3',
      summary: 'Keepsake is the set I carry. If your pocket is a different size, trust the checks, not the brand.',
    },
    sections: [
      p(
        'I have a drawer of empty notebooks bought for a better version of me. She journals at dawn. She has not been seen since 2019. The person who actually leaves the house needs a book that fits a coat, opens with one hand, and does not punish a pencil. That is the whole guide. The object at the end is the one that got bent on a train and still came home.',
      ),
      h2('Four checks, then you can spend', 'four-checks'),
      {
        type: 'ul',
        items: [
          'Size. If you have to decide to bring it, you will not bring it. Around 90 by 140 millimeters disappears into a jacket and still holds a full sentence.',
          'Paper. Pencil should look like pencil. A fine pen should not ghost so badly that the next page is a copy of your grocery list.',
          'Opening. Stitched books lie flatter than a glued brick. You will write closer to the gutter if the page stays.',
          'Cover. Soft enough to bend, firm enough that it does not become a sock. Skip the elastic. It exists to catch on a lining.',
        ],
      },
      figure(
        '/images/article-notebook.jpg',
        'Pocket notebook and cedar pencil on a cafe table',
        'The cafe is not the point. The fact that the book came with me is the point.',
        'wide',
      ),
      p(
        'Ignore page counts above a hundred in this size. A thick pocket book is a small brick, and bricks stay on desks feeling important. Forty to fifty leaves is a month of honest notes, or a week if you are nosy. When it fills, you start another. A finished notebook is a record. An endless one is a backlog with better paper.',
      ),
      h2('The set that got scuffed', 'the-set'),
      p(
        link('Keepsake', '/products/keepsake', 'mark'),
        ' ships as three cream books, 48 leaves, stitched, no slogan waiting on the first page to inspire you. The paper takes the cedar pencil I prefer and a fine pen without a mess. I have bent the cover into a crescent. It recovered. I also sent one through a wash inside the chore coat. It did not recover. No notebook does. Do not test this. I am telling you as a person who has held the sad pulp.',
      ),
      p(
        'The train story is ordinary, which is why I trust it. I was between Portland and a dinner I did not want, and the sentence for a piece arrived while the car was still in the yards. Phone notes would have turned it into a task. The pocket book took it as a mess: three lines, a crossed-out adjective, the name of the station where I almost got off early. I did not get off. I arrived, and the note was still a note, not a notification I had already half-answered. That is the luxury people keep trying to buy with leather and foil edges. The luxury is that the page does not ping. My handwriting is worse when I am honest. The book allows that. The dawn journal in the drawer does not, because it was purchased by someone performing calm.',
      ),
      figure(
        '/images/pencil-pocket.jpg',
        'Notebook and pencil in a coat pocket',
        'Still there at four in the afternoon. That is the review.',
        'left',
      ),
      figure(
        '/images/product-notebook.jpg',
        'The cream notebook in the studio',
        'Three of them. I lose one a year to honesty, not to style.',
        'right',
      ),
      ad('note', {
        label: 'If you are going to buy one',
        title: 'Keepsake, set of three',
        text: 'Cream, stitched, small enough for the coat that already has the job. We keep a set by the door because the drawer of empty books was getting smug.',
        href: '/products/keepsake',
        cta: 'On the shelf',
        style: 'arrow',
      }),
      {
        type: 'quote',
        text: 'The best pocket notebook is the one still on you when you are tired.',
      },
      p(
        'If you want a system, add one rule and stop. Left page for what you saw. Right page for what you will do. Anything more elaborate belongs in the tracker, where tasks go to be finished. The pocket book is for attention. Buy the one you are willing to scuff. Leave the dawn journal in the drawer. She is not coming.',
      ),
    ],
  },
  {
    slug: 'readwise-reader-finish',
    title: 'The Pile Got Smaller When I Gave It One Door',
    standfirst:
      'I used to keep a reading list in three places, which means I kept it nowhere. One inbox, a cruel thirty-day rule, and more essays actually finished.',
    excerpt:
      'Readwise Reader as a finish line, not a bigger shelf. The trick is what I refuse to save.',
    date: '2025-05-09',
    categories: ['Technology', 'Lifestyle'],
    layout: 'letter',
    image: '/images/article-reader.jpg',
    imageAlt: 'Someone reading on a tablet in a library chair, face out of frame',
    author: 'Mara Ellison',
    role: 'Editor',
    readMinutes: 10,
    tags: ['reading', 'attention', 'readwise'],
    external: { label: 'Visit Readwise', href: 'https://readwise.io' },
    verdict: {
      score: '8.4',
      summary: 'Best as a finish line. Highlights are a courtesy, not a second job.',
    },
    sections: [
      p(
        'Saving is not reading. I knew that and kept three lists anyway, like a person hiding snacks from herself. In May I picked one door for long writing: ',
        link('Readwise Reader', 'https://readwise.io', 'serif'),
        '. Essays go in. The newsletters that deserve a chair go in. Anything I can answer in two minutes stays out, or I do it standing up at the kettle and then I am free. The pile got smaller. More of it ended. I was suspicious of how simple that felt.',
      ),
      figure(
        '/images/article-reader.jpg',
        'Reading on a tablet in a quiet chair, bookshelves soft behind',
        'The library in the picture is a wish. The behavior is not.',
        'wide',
      ),
      h2('An inbox with a back button', 'one-door'),
      p(
        'Reader strips the carnival off a page and gives you type, a position, and a way to mark a line without decorating it. I read on a tablet in the bad armchair, which is the best chair we own. Ten finished pieces beat forty saved ones. I have to say that out loud because the software will happily hoard if you let it. You are allowed to be stricter than the product.',
      ),
      p(
        'Highlights come back later as prompts. I treat that as a courtesy. Once a week I sweep them. A line that still means something becomes a note, or a sentence in a draft. A line that was only impressive gets archived without a funeral. Taste changes. The queue should too. If a tab has sat for thirty days, it leaves. I do not negotiate with May-me. She was optimistic and oversubscribed.',
      ),
      figure(
        '/images/tablet-night.jpg',
        'A dark tablet on a wool blanket in an armchair',
        'Closed, which is the correct ending.',
        'right',
      ),
      ad('aside', {
        label: 'The tool, not the pile',
        title: 'Reader, if you already know what you meant to finish',
        text: 'Wrong pick if you are looking for more to read. Right pick if the guilt has a URL. We connected two newsletters, not twenty. That restraint is the feature.',
        href: 'https://readwise.io',
        cta: 'See Readwise',
        style: 'quiet',
        external: true,
      }),
      h2('Rules you can steal', 'rules'),
      {
        type: 'ul',
        items: [
          'Under five minutes: read it now or drop it. There is no third door.',
          'If it is for a specific story, name the story and put a date on it.',
          'Thirty days untouched and it goes. You will not miss the one that mattered. You will miss the feeling of being well-read in theory.',
          'Do not connect every newsletter you have ever liked. That is how inboxes drown while looking cultured.',
        ],
      },
      figure(
        '/images/about-studio.jpg',
        'The studio table in the afternoon, cups and notebooks',
        'Where the weekly sweep happens, usually with the second cup.',
        'left',
      ),
      {
        type: 'quote',
        text: 'I do not need another shelf. I need the lid to close.',
      },
      p(
        'Reader is the right recommendation for a person who already knows what they wish they had finished. It is the wrong one for a person hunting for more. We have enough. The work is to end the piece, close the tablet, and let the armchair be a chair again. I am better at that than I was in April. I am not good at it. Good is not the assignment.',
      ),
      p(
        'The piece I actually finished was not important. It was a short thing about a coat pocket, and it had been open in a tab since a Sunday when I felt cultured and tired. Reader put it back in front of me on a Wednesday without the twenty other tabs as chorus. I read it in the armchair with the tablet heavy on my knee, marked one line, and closed it. Then I wrote the coat note the next morning, not because the software is wise, but because the door was one door and I walked through it. If your pile is a personality, this will feel like a demotion. It is. I recommend the demotion. April-me would hate this paragraph. April-me also had forty essays and a sore neck.',
      ),
    ],
  },
  {
    slug: 'coastline-carafe-mornings',
    title: 'Breakfast Got Quieter When the Flask Left the Table',
    standfirst:
      'A speckled carafe that holds two slow cups, toast I actually taste, and the market peaches that ruined sad desk fruit for me.',
    excerpt:
      'Why 600 milliliters was a better limit than a thermal flask, and what I started buying on Saturdays.',
    date: '2025-03-21',
    categories: ['Food', 'Lifestyle', 'Reviews'],
    layout: 'gallery',
    image: '/images/article-carafe.jpg',
    imageAlt: 'A speckled ceramic carafe and cup on a linen morning table',
    author: 'Elise Cho',
    role: 'Field editor',
    readMinutes: 11,
    tags: ['breakfast', 'coffee', 'market'],
    productSlug: 'coastline-carafe',
    verdict: {
      score: '8.2',
      summary: 'Still on the morning table. A terrible travel mug, which it never pretended to be.',
    },
    sections: [
      p(
        'The studio used to start with a steel flask large enough to ignore. Coffee went cold at a pace we pretended not to notice, and the lid lived on a stack of proofs, collecting a ring. In March a potter sent the ',
        link('Coastline', '/products/coastline-carafe', 'mark'),
        ' set: a speckled carafe and a cup with the same iron flecks. It holds about 600 milliliters. That limit is the product. I did not understand that until the second week, when I wanted a third cup and the pot was empty and the morning was, inconveniently, over.',
      ),
      figure(
        '/images/toast-table.jpg',
        'Toast, butter, and a ceramic cup on a pale wood table',
        'The toast is not styled. I was hungry. That is allowed in a food piece.',
        'wide',
      ),
      h2('Pour, then stop', 'pour'),
      p(
        'The lip is clean if you commit and messy if you hesitate. I hesitated twice and wiped the linen and felt scolded by a jug. Since then the pour is a small finished gesture, which is more than I can say for most of the software we test. The clay keeps the second cup hot enough. It does not keep a third cup in suspended animation until noon. When it is empty, drinking is over and the table can become a desk. I resented that for three days and then I wrote better before lunch.',
      ),
      p(
        'Breakfast got less theoretical. Toast, butter, sometimes a peach if I had been to the market and not just thought about the market. I used to keep a sad apple in the drawer like a moral object. ',
        link('Serious Eats', 'https://www.seriouseats.com', 'quiet'),
        ' will tell you, correctly, that fruit wants to be ripe and eaten, not stored as proof of virtue. The apple was virtue. The peach was breakfast.',
      ),
      pair([
        {
          src: '/images/article-carafe.jpg',
          alt: 'Speckled carafe and cup in morning light',
          caption: 'Two cups. Then the laptop. That order changed the tone of the room.',
        },
        {
          src: '/images/market-peaches.jpg',
          alt: 'Peaches and a loaf on a market stall',
          caption: 'Saturday, if I go early. Sunday fruit is a different fruit.',
        },
      ]),
      ad('shelf', {
        label: 'On the morning table',
        title: 'Coastline, carafe and cup',
        text: 'Speckled stoneware, about two slow cups, no lid for the commute. If you need a sealed mug, this will annoy you and I will not argue.',
        href: '/products/coastline-carafe',
        cta: 'See the set',
        image: '/images/product-carafe.jpg',
        imageAlt: 'The speckled carafe in the studio',
        style: 'serif',
      }),
      h2('What I stopped calling cooking', 'not-cooking'),
      p(
        'I am not a person with a pantry philosophy. I am a person who can slice a peach and not check email while doing it. That turned out to be enough of a practice. On weeks when the piece will not come, I make soup in the evening — onion, whatever green thing is tired, salt, more salt — and eat it from the same kind of bowl I wish every cafe owned. It is not a recipe column. It is how I stop grazing on crackers and calling it a day.',
      ),
      figure(
        '/images/product-carafe.jpg',
        'The carafe alone on a warm gray ground',
        'Hand wash. Do not let it spar with the cast iron. Ask me how I know.',
        'left',
      ),
      {
        type: 'ul',
        items: [
          'Buy it for a table you sit at before the laptop opens.',
          'Do not buy it for a commute. The cup has no lid, on purpose.',
          'Two people can share it. Four people will expose it as a carafe and not a party.',
        ],
      },
      {
        type: 'quote',
        text: 'The flask is for travel days. The table is for telling the truth about how long a morning is.',
      },
      p(
        'Coastline stayed out. Objects that stay out are the ones I am willing to recommend. Everything else is inventory, including the apple, which I finally ate, and it was fine, and fine is not breakfast.',
      ),
    ],
  },
  {
    slug: 'soup-when-the-piece-stalls',
    title: 'What I Cook When the Sentence Will Not Come',
    standfirst:
      'A bowl of ordinary soup, the lamp on, and a beacon I can actually steer by. The piece can wait until the spoon is down.',
    excerpt:
      'Evening soup, a fixed light, and the case for feeding yourself before you feed the draft.',
    date: '2025-02-18',
    categories: ['Food', 'Lifestyle', 'Trends'],
    layout: 'letter',
    image: '/images/soup-bowl.jpg',
    imageAlt: 'A ceramic bowl of vegetable soup on a dark wooden table',
    author: 'Mara Ellison',
    role: 'Editor',
    readMinutes: 10,
    tags: ['soup', 'evening', 'desk'],
    verdict: {
      score: '8.0',
      summary: 'Not a recipe to optimize. A way to stop snacking your way through a stuck paragraph.',
    },
    sections: [
      p(
        'There is a fashion, lately, for desks that look like they have never produced a crumb. Mine produces crumbs. When a paragraph stalls I used to stand at the counter and eat crackers with the focus of a person performing thought. It was not thought. It was salt. In February I started making a pot of soup on the nights the draft went mean, and eating it at the table with the ',
        link('lamp', '/products/lumen-arc', 'ink'),
        ' on and the laptop closed. The piece did not magically arrive. I did stop being hungry and furious, which is a precondition I had been skipping.',
      ),
      figure(
        '/images/soup-bowl.jpg',
        'Steam rising from a simple bowl of soup',
        'Onion, a tired leek, salt. I am not going to pretend there is a technique.',
        'wide',
      ),
      h2('The recipe is barely a recipe', 'barely'),
      p(
        'Onion in butter until it smells like you meant it. A potato if you have one. The green thing that was going to be wasted and then become a moral crisis. Stock or water. Salt, then more salt than your careful self allows. A bay leaf if you are showing off for no one. If you want a real method, the people at ',
        link('Serious Eats', 'https://www.seriouseats.com', 'quiet'),
        ' will not insult the potato. I am only saying: feed the person before you negotiate with the sentence.',
      ),
      p(
        'I eat it from a heavy bowl. The ',
        link('carafe', '/products/coastline-carafe', 'mark'),
        ' is for the morning. The bowl is for the hour I am most likely to lie to myself. Soup is hard to eat while typing. That is a feature. Crackers are easy to eat while typing. That is how the draft stays bad and the box gets empty.',
      ),
      figure(
        '/images/evening-desk.jpg',
        'A brass lamp over a notebook at dusk',
        'Laptop closed. The notebook can have the list. The soup has the person.',
        'right',
      ),
      ad('note', {
        label: 'The light, while you eat',
        title: 'Leave the Lumen on',
        text: 'A ceiling light makes soup look like a cafeteria. The brass pool makes it look like you live here. We keep ours dimmed lower than the box suggests.',
        href: '/products/lumen-arc',
        cta: 'The evening lamp',
        style: 'serif',
      }),
      h2('A fixed light', 'fixed-light'),
      p(
        'I have been thinking about beacons, which is an embarrassing sentence and also why this journal has its name. A beacon does not follow you around the coast. It stays, so you can steer. The trend is to optimize the evening: a protocol, a powder, a screen that tells you how recovered you are. I tried caring about that for a month. I was tired in a more expensive way. The soup is dumber and it works. So does the lamp. So does closing the machine before the bowl is empty.',
      ),
      figure(
        '/images/article-beacon.jpg',
        'A small coastal light at dusk over a calm sea',
        'Not our kitchen. The idea, when I need to remember it.',
        'wide',
      ),
      {
        type: 'quote',
        text: 'Feed the person who has to write the sentence. The sentence can be second.',
      },
      p(
        'If you are new here, the shelf is short on purpose and the archive is dated so you can see what we believed. If you are stuck tonight, ignore the archive. Onions. Salt. The lamp. Eat at the table like a person who intends to come back to the work, not like a person being chased by it. I burned the onion last Thursday. The soup was still dinner. The paragraph showed up after the dishes, which is not a system, and I am keeping it anyway.',
      ),
    ],
  },
];

/**
 * Find a story by slug.
 * @param {string} slug
 * @returns {object | undefined}
 */
export function getArticleBySlug(slug) {
  return articles.find((item) => item.slug === slug);
}
