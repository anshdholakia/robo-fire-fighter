# CalHacks 10 monorepo

> The spot for our code for running spotter on [Spot](https://bostondynamics.com/products/spot/)

**backend**: web server for multilingual, multimodal AI processing
- REST API written in Python using Flask
- [Poetry](https://python-poetry.org/) for dependency management
- [Hume AI](https://hume.ai/)
- [GPT-4](https://openai.com/research/gpt-4)
- [Bark](https://github.com/suno-ai/bark)

**spotter**: frontend that enables easy robot control and shows the robot's camera and data feed
- serves data and object recognition from AI backend
- makes requests to robot control backend based on keyboard and mouse inputs
- [Bun](https://bun.sh/)
- [Next.js](https://nextjs.org/)
- [shadcn-ui](https://ui.shadcn.com/) components

**robot-control-server**: web server that enables remote control of the robot
- REST API written in Python using Flask
- Boston Dynamics SDK

----

## Press

- Demo
  - https://www.youtube.com/watch?v=f8duOCsi8As
  - https://devpost.com/software/spotter-revolutionizing-disaster-relief
  - https://www.instagram.com/p/Czmc3bqy5Gq/

- LinkedIn
  - https://www.linkedin.com/feed/update/urn:li:activity:7126407430812356608/
  - https://www.linkedin.com/posts/sutardjacenter_calhacks-ucberkeley-spot-activity-7126599039646629889-RRhp

- Twitter
  - https://twitter.com/ravi_riley/status/1721648835670503774
  - https://twitter.com/JayadityaSethi/status/1720578125556502914

----

## Running the stack:

First, clone this repo. If you don't have access to a Spot, you can still demo the entire frontend and AI part of the app locally, as long as you provide your OpenAI and Hume.ai API keys as an environment variables.

### backend
1. install Poetry
2. `poetry install`
3. `poetry run dev` to start the backend

### frontend
1. install Bun
2. `bun install`
3. `bun dev` to start the frontend

### robot server
1. connect to Spot's wifi network
2. run `python3 python/examples/wasd_server/app.py` and replace the hostname `192.168.80.3` with your Spot's IP
3. enter the `admin` username & password, or the equivalent credentials for your Spot
4. send requests to control endpoints manually or via the frontend
