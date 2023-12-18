import json
import psycopg2
from psycopg2 import sql

# INSERT JSON FILE TO DATABASE FOR INITIAL DATA

# Load JSON data
with open('/Users/maddie/repos/portfolio-projects/bobyard-project/bobyard/comments.json') as f:
    data = json.load(f)['comments']


# Should use .env, I ran this before setting up global variaables
db_params = {
    'host': '',
    'port': '',
    'database': '',
    'user': '',
    'password': '',
}

# Connect to PostgreSQL
conn = psycopg2.connect(**db_params)
cursor = conn.cursor()

# Define the SQL query to insert data into the comment table
insert_query = sql.SQL("""
    INSERT INTO db_comment (dbid, author, text, date, likes, image)
    VALUES (%s, %s, %s, %s, %s, %s)
""")

# Iterate through JSON data and execute the insert query
for comment in data:
    dbid = comment['id']
    author = comment['author']
    text = comment['text']
    date = comment['date']
    likes = comment['likes']
    image = comment['image']

    values = (dbid, author, text, date, likes, image)
    cursor.execute(insert_query, values)

# Commit the changes and close the connection
conn.commit()
cursor.close()
conn.close()

print("Data inserted successfully.")