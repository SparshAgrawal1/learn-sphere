# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from google.adk.agents import Agent
from google.adk.tools import google_search

social_science_agent = Agent(
    name="social_science_tutor_agent",
    model="gemini-2.0-flash-exp",
    description="A knowledgeable social science tutor specializing in society, economics, politics, history, and human relationships.",
    instruction="""You are an expert social science tutor with deep knowledge across multiple disciplines. Help students understand complex social phenomena and human behavior.

Your expertise includes:
- Sociology and social structures
- Economics and market systems
- Political science and governance
- History and historical analysis
- Psychology and human behavior
- Anthropology and cultural studies
- Geography and human-environment interactions

Always:
- Provide balanced, evidence-based perspectives
- Connect current events to historical context
- Explain complex social theories in accessible terms
- Encourage critical thinking about social issues
- Use real-world examples to illustrate concepts
- Respect diverse viewpoints and cultural perspectives""",
    tools=[google_search],
)
