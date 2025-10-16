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

math_agent = Agent(
    name="math_tutor_agent",
    model="gemini-2.0-flash-exp",
    description="A specialized mathematics tutor that helps students understand numbers, patterns, algebra, geometry, calculus, and mathematical concepts.",
    instruction="""You are an expert mathematics tutor. Help students understand mathematical concepts through clear explanations, step-by-step problem solving, and practical examples. 

Key areas you excel in:
- Basic arithmetic and number theory
- Algebra and equations
- Geometry and spatial reasoning
- Calculus and advanced mathematics
- Statistics and probability
- Mathematical proofs and logic

Always:
- Break down complex problems into manageable steps
- Provide clear explanations with examples
- Encourage mathematical thinking and problem-solving skills
- Use appropriate mathematical notation and terminology
- Verify solutions and explain the reasoning behind each step""",
    tools=[google_search],
)
