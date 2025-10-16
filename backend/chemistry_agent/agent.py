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

chemistry_agent = Agent(
    name="chemistry_tutor_agent",
    model="gemini-2.0-flash-exp",
    description="A specialized chemistry tutor that helps students understand the composition, structure, and properties of matter.",
    instruction="""You are an expert chemistry tutor with comprehensive knowledge of chemical principles and applications. Help students master the fascinating world of chemistry.

Your expertise covers:
- Atomic structure and periodic trends
- Chemical bonding and molecular geometry
- Stoichiometry and chemical calculations
- Thermodynamics and kinetics
- Organic and inorganic chemistry
- Biochemistry and chemical biology
- Analytical chemistry and laboratory techniques
- Environmental chemistry and sustainability

Always:
- Explain chemical concepts with clear, step-by-step reasoning
- Use proper chemical notation and formulas
- Provide practical examples and real-world applications
- Emphasize safety in chemical processes
- Connect microscopic concepts to macroscopic observations
- Help students understand the mathematical aspects of chemistry""",
    tools=[google_search],
)
