import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class MovieRecommender:
    def __init__(self, movie_data_path,top_rated_path):
        # Load movie data from CSV
        self.movies_df = pd.read_csv(movie_data_path)
        self.movies_toprated_df = pd.read_csv(top_rated_path)
        # Assume movie data has 'title', 'overview', 'genres', and 'keywords'
        self.movies_df['overview'] = self.movies_df['overview'].fillna('')
        self.movies_df['genres'] = self.movies_df['genres'].fillna('')
        self.movies_df['keywords'] = self.movies_df['keywords'].fillna('')
        self.movies_df['tagline'] = self.movies_df['tagline'].fillna('')
        # Combine features for similarity
        self.movies_df['combined_features'] = (
            self.movies_df['overview'] + ' ' +
            self.movies_df['genres'] + ' ' +
            self.movies_df['keywords'] + ' ' +
            self.movies_df['tagline']
        )

        # Convert combined features into numerical form using TF-IDF
        tfidf = TfidfVectorizer(stop_words='english')
        self.movie_features = tfidf.fit_transform(self.movies_df['combined_features'])

    def filter_movies(self, mood=None, genre=None, occasion=None, age=None, category=None):
        filtered_df = self.movies_df
        
        if category:
            keyword = ''
            if category == 'Movies based on a true story':
                keyword = 'based on a true story|Based on a True Story|Inspired by True Events|Biographical|Biography|True Story|Real Events|Historical|Non-Fiction|Life Story|Documentary|Docudrama|Authentic|Based on Real Life|Real People|Fact-based|Real-life Drama|True Crime|Factual|Real Events Adaptation|Historical Drama|True Events Retelling|Life and Times|Personal Journey|Famous Figures|Cultural Impact|Documented Events|Historical Figures|Chronicle|Narrative Non-Fiction|True Life|Verité|Memoir|Historical Accuracy|Factually Inspired|Actual Events|Biopic'                
            elif category == 'Movies that may change the way you look at life':
                keyword = "Life-changing|Transformational|Inspirational|Thought-provoking|Eye-opening|Reflective|Perspective Shift|Personal Growth|Self-discovery|Motivational|Existential|Philosophical|Life Lessons|Human Experience|Journey|Coming of Age|Overcoming Adversity|Triumph|Redemption|Awakening|Life Choices|Value of Life|Emotional Impact|Self-Reflection|Impactful|Cultural Insight|Realizations|Change|Enlightenment|Heartwarming|Dramatic Transformation|Life Altering|New Perspectives|Life's Journey|Finding Purpose|Defining Moments|Mindfulness|Legacy|Authenticity"               
            elif category == 'Movies set in New York City':
                keyword = 'New York City|Park|Empire State Building|Statue of Liberty|Wall Street|New York Subway|Broadway|Skyscrapers|New York Skyline|New York Streets|New York Taxi|NYC Police|New York Crime|New York Mafia|New York Gangsters|New York Nightlife|New York Apartments|New York Real Estate|New York Architecture|New York Landmarks|Upper East Side|Lower East Side|New York City Drama|New York Romance|New York Comedy|NYC Action|NYC Thriller|New York Culture|New York Immigrants|New York Fashion|New York Restaurants|New York Media|New York Financial District|New York in Winter|New York Summer|'                
            elif category == 'Spy Movies':
                keyword = 'Spy|Spy Thriller|Secret Agent|Espionage|Undercover|Double Agent|Covert Operation|Intelligence Agency|CIA|MI6|FBI|KGB|Spy Mission|Code Name|Assassination|Spy Ring|Black Ops|Top Secret|Cold War|Spy Network|Surveillance|Bugging|Infiltration|Deception|Disguise|Stealth|Sabotage|Espionage Thriller|Spy Gadgets|Agent in Peril|Mole|Spy vs Spy|Field Agent|Espionage Plot|Spy Conspiracy|Spy Drama|Spy Action|Spy Chase|Espionage Agency|Secret Mission|Global Espionage|Sleeper Agent' 
            elif category == 'Cop Movies':
                keyword = 'Cop|Police Officer|Detective|Undercover Cop|Law Enforcement|Police Procedural|Crime Investigation|Homicide Detective|Narcotics Detective|Vice Squad|Special Investigations Unit|Criminal Investigation|Police Force|SWAT Team|Crime Scene Investigation|FBI Investigation|Police Chase|Police Shootout|Crime Thriller|Internal Affairs|Corrupt Cop|Police Interrogation|Police Squad|Hostage Negotiation|Police Drama|Cop Duo|Cop Action|Bad Cop|Rookie Cop|Dirty Cop|Lawman|Police Raid|Cop Thriller|Detective Thriller|Patrol Officer' 
            elif category == 'Space Movies':
                keyword = 'Space|Outer Space|Deep Space|Space Exploration|Space Travel|Space Mission|Space Station|Space Colony|Spacecraft|Spaceship|Space Shuttle|Mars|Moon|Planet|Interplanetary|Alien Planet|Solar System|Black Hole|Wormhole|Astronaut|Cosmonaut|Space Engineer|Space Crew|Space Commander|Aliens|Alien Invasion|Extraterrestrial|First Contact|Galactic War|Space Battle|Space War|Space Combat|Space Pirates|Space Opera|Starship|Space Suits|Artificial Intelligence|AI|Robots|Dystopia|Utopia|Terraforming|Zero Gravity|Microgravity|Asteroid|Comet|Supernova|Meteor Shower|Space Anomaly|Cosmic Event|Space-Time|Cosmic Rays|Gravitational Waves|Space Adventure|Space Rescue|Space Survival|Lost in Space|Space Colonization|Space Race|Intergalactic|Spaceship Crash|Space Horror'                
            elif category == 'Wedding Movies':
                keyword = 'Wedding|Wedding Event|Wedding Ceremony|Wedding Planning|Wedding Reception|Bride|Groom|Bridesmaids|Groomsmen|Wedding Dress|Bachelor Party|Bachelorette Party|Engagement|Wedding Venue|Romantic Themes|Love Story|Engagement|Proposal|Love Triangle|Second Chances|Family and Relationships|Family Drama|In-Laws|Father of the Bride|Mother of the Bride|Wedding Crashers|Exes at Weddings|Specific Types of Weddings|Destination Wedding|Beach Wedding|Royal Wedding|Elopement|Multicultural Wedding|Traditional Wedding|Big Fat Wedding|Wedding Planner|Wedding Photographer|Florist|Wedding Band'                
            elif category == 'Heist Movies':
                keyword = 'Bank Heist|Jewelry Heist|Museum Heist|Art Heist|Robbery|Bank Robbery|Vault Robbery|Armed Robbery|Grand Theft|Smash-and-Grab|Train Robbery|Casino Robbery|Theft|Jewel Theft|Car Theft|Master Thief|Cat Burglar|Safe Cracking|Planning/Execution Terms|Caper|Inside Job|Master Plan|Elaborate Scheme|Double Cross|Getaway|Criminal Crew|Con Artists|Robbery Team|Partners in Crime|Accomplice'
            elif category == 'Movies based on a book':
                keyword = "based on a book|Based on a Book|Adaptation|Literary Adaptation|From Novel|Book to Film|Inspired by a Book|Based on a Novel|Book Adaptation|Screenplay Adaptation|Fictional Adaptation|Source Material|Novel Adaptation|Classic Literature|Bestseller Adaptation|Graphic Novel Adaptation|Young Adult Novel|Memoir Adaptation|Author's Work|Based on True Events|Book Series|Literary Classic|Film Adaptation|Page to Screen|Book Characters|Story from a Book|Reading to Film|Adapted Screenplay|Book Lovers|Literature on Screen|Cinematic Adaptation|Novelist|Book Inspiration|Book-to-Movie|Storytelling|Published Work|Literary Work"               
            elif category == 'Racing Movies':
                keyword = 'Racing|Car Racing|Street Racing|Drag Racing|Motorcycle Racing|NASCAR|Formula 1|Horse Racing|Boat Racing|Rally Racing|Fast Cars|Race Cars|Supercars|Grand Prix|Circuit Racing|Track Racing|Off-Road Racing|Speed'
            elif category == 'Girl Power Movies':
                keyword = 'Girl Power|Female Empowerment|Women Empowering Women|Strong Female Lead|Feminism|Girl Boss|Sisterhood|Women’s Rights|Female Protagonist|Girl Friendship|Breaking Stereotypes|Women in Charge|Self-Discovery|Independence|Women’s Stories|Feminist Themes|Empowered Women|Bold Women|Resilience|Women’s Journey|Overcoming Obstacles|Female Heroes|Girl Tribe|Challenging Norms|Women Supporting Women|Empowering Stories|Defying Expectations|Female Representation|Girlhood|Courageous Women|Women’s Achievements|Equality|Women in Leadership|Women’s Solidarity|Diversity|Girl Power Anthem|Inspirational Women|Women’s Narratives'                
            elif category == 'Movies set in Las Vegas':
                keyword = 'Las Vegas|Vegas|Sin City|Casino|Gambling|High Stakes|Las Vegas Strip|Las Vegas Nights|Neon Lights|Showgirls|Slot Machines|Poker|Blackjack|Casino Heist|Las Vegas Weddings|Nightlife|Entertainment Capital|Las Vegas Shows|Viva Las Vegas|Desert City|Las Vegas Hotels|Fremont Street|Gambling Addiction|Vegas Parties|Chips|Las Vegas Locals|Las Vegas Attractions|Las Vegas Lifestyle|Las Vegas Casinos|Sin City Adventure|Las Vegas Nightclubs|Vegas Weddings|Las Vegas Events|Las Vegas Culture|The Mob|Las Vegas Drama|Las Vegas Comedy|Las Vegas Mystery|Las Vegas Romance|Vices|Big Win|Casino Royale'
            elif category == 'Movies with pre- or sequels':
                keyword = 'Prequel|Sequel|Franchise|Follow-Up|Spin-Off|Continuing Story|Series|Film Series|Origin Story|Expanded Universe|Cliffhanger|Returning Characters|Part Two|Part Three|Second Installment|Third Installment|Prequel Trilogy|Sequel Trilogy|Reboot|Remake|Legacy Sequel|Chapter Two|Next Chapter|Series Continuation|Character Development|Character Arc|Story Continuation|Backstory|Cinematic Universe|Multi-part Film|Serialized Storytelling|Episodic|Anthology|Continuation|Next Generation|Cross-Over|Time Jump|Future Installment|Film Saga|Revisiting Characters|Recurring Themes|Recurring Cast'
            elif category == 'IMDb Top 250 Movies':
                filtered_df = self.movies_toprated_df
                keyword = ''                            
            filtered_df = filtered_df[filtered_df['overview'].str.contains(keyword, na=False)]
            
        # Apply mood filter
        if mood:
            if mood == 'Happy':
                filtered_df = filtered_df[filtered_df['genres'].str.contains('Comedy|Adventure|Family')]
            elif mood == 'Sad':
                filtered_df = filtered_df[filtered_df['genres'].str.contains('Drama|Romance')]
            # Neutral would have no filter
        
        # Apply genre filter
        if genre:
            genre_filter = '|'.join(genre)  # Combine genres with OR condition
            filtered_df = filtered_df[filtered_df['genres'].str.contains(genre_filter)]
        
        # Apply occasion filter
        if occasion:
            if occasion == 'Movie Date':
                filtered_df = filtered_df[filtered_df['genres'].str.contains('Romance')]
            elif occasion == 'Movie Night with friends':
                filtered_df = filtered_df[filtered_df['genres'].str.contains('Comedy|Action|Thriller')]
            elif occasion == 'Watching a movie with family or relatives':
                filtered_df = filtered_df[filtered_df['genres'].str.contains('Family')]

        # Apply age filter
        if age:
            if age == 'Published in the last 3 years':               
                filtered_df = filtered_df[filtered_df['release_date'] >= '2021']
            elif age == 'Published in the last 5 years':
                filtered_df = filtered_df[filtered_df['release_date'] >= '2019']
            elif age == 'Published in the last 10 years':
                filtered_df = filtered_df[filtered_df['release_date'] >= '2014']
            elif age == 'Published in the last 20 years':
                filtered_df = filtered_df[filtered_df['release_date'] >= '2004']
                       
                
        return filtered_df

    def recommend(self, num_recommendations=30, mood=None, genre=None, occasion=None, age=None, category=None):
        filtered_df = self.filter_movies(mood, genre, occasion, age, category)
        filtered_df=filtered_df.head(500)
        # Randomly select movies if the filtered dataset is not empty
        if not filtered_df.empty:
            return filtered_df['id'].sample(n=min(num_recommendations, len(filtered_df))).values.tolist()
        else:
            return ["No recommendations available based on the selected criteria."]