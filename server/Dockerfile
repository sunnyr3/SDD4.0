# The first instruction is what image we want to base our container on
# We use an official Python runtime as a parent image
FROM python:3

# The environment variable ensures that the python output isset straight
# to the terminal without buffering it first
ENV PYTHONUNBUFFERED 1

# Create root directory for our project in the container
RUN mkdir /server

# Set the working directory to /server
WORKDIR /server

# Copy the current directory contents to the container at /server
ADD . /server/

ENV PYTHONPATH "${PYTHONPATH}:/server"

# Install any required packages specified in requirements.txt
# RUN pip install psycopg2
RUN pip install -r requirements.txt
