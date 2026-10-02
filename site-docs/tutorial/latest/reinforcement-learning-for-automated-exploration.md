# Reinforcement Learning for Automated Exploration

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/ML_Inference/Desktop_Applications/06_rl_automated_exploration.html

## Table of Contents

- [Beyond Scripted Tests](#_beyond_scripted_tests)
- [Beyond_Scripted_Tests](#_beyond_scripted_tests)
- [The Markov Decision Process (MDP)](#_the_markov_decision_process_mdp)
- [The_Markov_Decision_Process_(MDP)](#_the_markov_decision_process_mdp)
- [Curiosity-Driven Exploration](#_curiosity_driven_exploration)
- [The Challenge: How do you reward a QA tester?](#_the_challenge_how_do_you_reward_a_qa_tester)
- [The_Challenge:_How_do_you_reward_a_QA_tester?](#_the_challenge_how_do_you_reward_a_qa_tester)
- [The "Surprise" Mechanic: RND](#_the_surprise_mechanic_rnd)
- [The_"Surprise"_Mechanic:_RND](#_the_surprise_mechanic_rnd)
- [Why "Distillation"?](#_why_distillation)
- [Architecture: Connecting the Agent to Vulkan](#_architecture_connecting_the_agent_to_vulkan)
- [Architecture:_Connecting_the_Agent_to_Vulkan](#_architecture_connecting_the_agent_to_vulkan)
- [Implementing the RND Module](#_implementing_the_rnd_module)
- [Implementing_the_RND_Module](#_implementing_the_rnd_module)
- [Vulkan Application Interface](#_vulkan_application_interface)
- [Vulkan_Application_Interface](#_vulkan_application_interface)
- [Approach 1: Programmatic Control](#_approach_1_programmatic_control)
- [Approach_1:_Programmatic_Control](#_approach_1_programmatic_control)
- [Approach 2: External Control (Linux)](#_approach_2_external_control_linux)
- [Approach_2:_External_Control_(Linux)](#_approach_2_external_control_linux)
- [The RL Agent: PPO (Proximal Policy Optimization)](#_the_rl_agent_ppo_proximal_policy_optimization)
- [The_RL_Agent:_PPO_(Proximal_Policy_Optimization)](#_the_rl_agent_ppo_proximal_policy_optimization)
- [Why PPO?](#_why_ppo)
- [Actor-Critic Architecture](#_actor_critic_architecture)
- [Action Space Design](#_action_space_design)
- [Action_Space_Design](#_action_space_design)
- [Training Loop](#_training_loop)
- [Use Case 1: CI Bug Discovery](#_use_case_1_ci_bug_discovery)
- [Use_Case_1:_CI_Bug_Discovery](#_use_case_1_ci_bug_discovery)
- [Hyperparameter Tuning for QA](#_hyperparameter_tuning_for_qa)
- [Hyperparameter_Tuning_for_QA](#_hyperparameter_tuning_for_qa)
- [Use Case 2: Automated Benchmarking](#_use_case_2_automated_benchmarking)
- [Use_Case_2:_Automated_Benchmarking](#_use_case_2_automated_benchmarking)
- [Use Case 3: Automated Demo Mode](#_use_case_3_automated_demo_mode)
- [Use_Case_3:_Automated_Demo_Mode](#_use_case_3_automated_demo_mode)
- [Debugging and Monitoring](#_debugging_and_monitoring)
- [Debugging_and_Monitoring](#_debugging_and_monitoring)
- [Summary](#_summary)

## Content

Up to this point, we’ve been teaching our CI to verify things we already know about. We tell it: "Check this button," or "Verify this texture." But what about the bugs you **haven’t** thought of? What about that rare crash that only happens if you click the 'Options' menu exactly three times while a level is loading?

In this final chapter of the Desktop Applications section, we’re going to build something truly autonomous. We’re going to create a **Reinforcement Learning (RL) agent**—a tireless, digital QA tester whose only job is to explore your application and find things that look "new" or "broken."

Traditional testing is like a checklist. You follow the steps, you check the boxes. But applications are complex, and the state space is infinite. You can’t write a test for every possible sequence of inputs.

An RL agent doesn’t follow a script. It learns by interacting. It clicks buttons, moves the camera, and navigates menus. But unlike a human, it can do this thousands of times an hour, 24/7, inside your CI pipeline.

To build our explorer, we must frame our Vulkan application as an **MDP**.
*   **State (  )**: The current screen pixels (what the agent "sees").
*   **Action (  )**: A click or a keystroke (what the agent "does").
*   **Transition**: The application moving to the next frame/menu based on the action.
*   **Reward (  )**: A numerical value telling the agent how "good" its action was.

In most RL problems (like Atari games), the reward comes from the game score. But in a Vulkan app, there is no score. We must invent one.

We’re going to focus on **Curiosity-Driven Exploration**. Instead of rewarding the agent for "winning," we’re going to reward it for being surprised.

![RND diagram showing Target and Predictor networks and how prediction error generates a reward](../../_images/images/ML_Inference/Desktop_Applications/rnd_diagram.svg)

Figure 1. Random Network Distillation (RND) Curiosity Mechanism

In a typical RL scenario—like teaching an agent to play Chess—the reward is simple: you win (+1) or you lose (-1). But in a Vulkan application, there is no "winning." We just want the agent to explore as much as possible.

If we reward it for finding crashes, it might find one crash and then just keep doing that same thing over and over again to maximize its "score." That’s not helpful.

Instead, we use a technique called **Random Network Distillation (RND)**. We reward the agent for seeing things it hasn’t seen before.

Imagine you have two friends, Alice and Bob.
*   **Alice** has seen every possible screen in your app once, and she has a perfect memory. You can show her any screen, and she’ll immediately tell you exactly what it looks like.
*   **Bob** is currently learning from Alice.

When you show them a screen they’ve both seen a thousand times (like the Main Menu), Bob can predict exactly what Alice will say. There’s no surprise.

But if you show them a screen that is rare—like a crash report or a hidden debug menu—Bob will struggle to predict Alice’s response. That "prediction error" is our reward!

In RND, we don’t actually have a human Alice. Instead, we use a **Random Fixed Network**. This network is initialized with random weights and **never trained**. It represents a complex mathematical "landscape."

Our agent’s "Curiosity Network" tries to **Distill** (predict) the output of that random network.
*   For familiar pixels, it succeeds (low error).
*   For new pixels, it fails (high error).

  

  

Where    is the fixed random target and    is our trainable predictor.

To make this work, we need three pieces:
1.  **The Environment**: Our Vulkan application. It needs to send frames to the agent and accept input (clicks/keystrokes) back.
2.  **The Brain**: The RL agent (we’ll use an algorithm called PPO) that decides what to do next.
3.  **The Curiosity**: The RND module that calculates how "surprising" each frame is.

![Architecture diagram showing the loop between Vulkan App](../../_images/images/ML_Inference/Desktop_Applications/rl_system_architecture.svg)

Figure 2. RL Agent and Vulkan Integration Architecture

Start with the curiosity reward system:

class RNDCuriosityModule:
    """Computes a reward based on how 'surprised' we are by a frame."""
    def __init__(self, device='cuda'):
        # Alice: Fixed random network (the 'Target')
        self.random_net = RandomNetwork().to(device)
        # Bob: Trainable network (the 'Predictor')
        self.predictor_net = PredictorNetwork().to(device)

    def compute_intrinsic_reward(self, frames):
        with torch.no_grad():
            target_features = self.random_net(frames)

        predicted_features = self.predictor_net(frames)

        # The more Bob struggles to predict Alice's output,
        # the higher the 'curiosity' reward.
        reward = torch.mean((predicted_features - target_features) ** 2, dim=1)
        return reward

The predictor gradually learns to match the random network on familiar states, making those states less rewarding. Novel states remain highly rewarding until the agent sees them enough times.

The agent needs to interact with your Vulkan app. Two approaches:

Instrument your application to accept commands from the RL agent:

class RLControllableApp {
public:
    void run() {
        while (!shouldClose_) {
            // 1. Check for actions from the RL agent
            if (popAction(action)) executeAction(action);

            // 2. Standard Vulkan Render
            render();

            // 3. Capture observation (frame) for the agent
            auto pixels = readFramebuffer();
            sendToAgent(pixels);
        }
    }

private:
    void executeAction(const Action& action) {
        // Map agent actions to UI events (e.g. ImGui mouse/key injection)
        if (action.type == Action::Click) injectClick(action.x, action.y);
        // ...
    }
};

Use X11 or Wayland to inject input events externally:

class ExternalVulkanController:
    """Uses OS-level tools (like xdotool) to control a standard Vulkan app."""
    def __init__(self, app_command):
        self.process = subprocess.Popen(app_command)
        self.window_id = self.find_window("VulkanApp")

    def capture_frame(self):
        # Capture the window region using OS screenshot tools
        screenshot = ImageGrab.grab(bbox=self.get_window_geometry())
        return np.array(screenshot)

    def click(self, x, y):
        # Inject mouse click via xdotool
        subprocess.run(['xdotool', 'mousemove', '--window', self.window_id, str(x), str(y), 'click', '1'])

Programmatic control is faster and more reliable. External control is easier to add to existing applications without modification.

For the agent’s brain, we use **PPO**. This algorithm is the industry standard for stable, reliable learning.

Older algorithms (like Vanilla Policy Gradient) were unstable. If the agent made one "bad" update, its performance would collapse, and it would never recover. PPO uses a **Clipping Mechanism** to ensure that each update doesn’t change the agent’s behavior **too** much.

The PPO agent has two "heads":
1.  **The Actor (Policy)**: Outputs probabilities for each action (e.g., 80% chance to click button A, 20% to click button B).
2.  **The Critic (Value)**: Predicts the future reward of the current state.

By comparing the actual reward to the Critic’s prediction, the agent calculates the **Advantage**—how much better (or worse) the action was than expected.

  

  

If the Advantage is positive, the agent increases the probability of that action in the future.

class PPOAgent:
    def select_action(self, state):
        # 1. Pass the screen pixels through the CNN
        # 'logits' come from the Actor head, 'value' from the Critic head
        logits, value = self.policy_net(state)

        # 2. Sample an action (exploration vs exploitation)
        # We don't always pick the best action; sometimes we pick
        # a less likely one to keep exploring.
        action = sample_from_distribution(logits)

        return action, value

Define what the agent can do:

class ActionSpace:
    """Discrete actions the agent can take (e.g., Click X,Y or Press Key)."""
    def action_to_command(self, action_id):
        if action_id 

The grid-based clicking is discrete (required for most RL algorithms) but provides reasonable coverage of UI elements.

Put it all together:

def train_explorer():
    # 1. Initialize our curiosity module and the agent
    curiosity = RNDCuriosityModule()
    agent = PPOAgent()

    while True:
        # 2. Agent interacts with the Vulkan app
        action = agent.select_action(current_screen)
        execute_in_vulkan(action)

        # 3. Calculate 'Surprise' reward
        reward = curiosity.compute_intrinsic_reward(next_screen)

        # 4. If the app crashed, give a huge bonus reward!
        if app_crashed(): reward += 10.0

        # 5. Learn from this experience
        agent.update(experience_buffer)
        curiosity.update(next_screen)

Train the agent overnight in CI:

name: RL Exploration Testing

on:
  schedule:
    - cron: '0 2 * * *'  # Run nightly at 2 AM

jobs:
  explore:
    runs-on: ubuntu-latest
    timeout-minutes: 360  # 6 hours

    steps:
      - uses: actions/checkout@v3

      - name: Build application
        run: |
          mkdir build && cd build
          cmake .. -DCMAKE_BUILD_TYPE=Release
          make -j$(nproc)

      - name: Install RL dependencies
        run: |
          pip install torch torchvision numpy opencv-python pyautogui

      - name: Run RL exploration
        run: |
          python scripts/rl_explorer.py \
            --app ./build/my_vulkan_app \
            --episodes 1000 \
            --checkpoint models/explorer_checkpoint.pt

      - name: Upload crash logs
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: rl-discovered-crashes
          path: crashes/

The agent explores your app for hours, logging any crashes with reproduction steps. More importantly, every visual anomaly it finds can be automatically funneled into the **Bug Harvesting** pipeline we established in Chapter 4, further strengthening your semantic validator with real-world failure cases.

Exploration agents need different settings than gaming agents:
*   **   (Gamma)**: The "Discount Factor." We set this high (0.999) because we care about long-term sequences of clicks that lead to new menus.
*   **   (Lambda)**: For GAE (Generalized Advantage Estimation). Helps balance variance and bias.
*   **Entropy Coefficient**: We set this high (0.01 to 0.1) to **force** the agent to keep clicking randomly even when it thinks it found a good path. This is the "tireless" part of our QA tester.

Train an agent to navigate to performance-intensive scenes:

class BenchmarkingAgent(PPOAgent):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fps_history = []

    def compute_reward(self, frame, fps):
        """Reward agent for finding slow scenes"""
        # Intrinsic curiosity reward
        intrinsic = self.curiosity.compute_intrinsic_reward(frame)

        # Extrinsic reward: finding low FPS is good (for benchmarking)
        extrinsic = 0.0
        if fps 

Run this agent to automatically discover performance bottlenecks in your application.

Train an agent to showcase features:

# Reward function for impressive demos
def demo_reward(state, action, next_state):
    # High reward for visual variety
    visual_change = np.mean(np.abs(next_state - state))

    # High reward for accessing different menus
    ui_diversity = measure_ui_diversity(next_state)

    # Penalty for getting stuck
    stuck_penalty = -1.0 if visual_change 

The trained agent can run in "demo mode" at trade shows or in trailers, automatically navigating through impressive features.

Track what the agent is learning:

import matplotlib.pyplot as plt
from collections import deque

class ExplorationMonitor:
    def __init__(self):
        self.visited_states = {}  # Hash -> visit count
        self.crashes_found = []
        self.episode_rewards = deque(maxlen=100)

    def record_state(self, state):
        state_hash = hash(state.tobytes())

        if state_hash not in self.visited_states:
            self.visited_states[state_hash] = 0

        self.visited_states[state_hash] += 1

    def plot_exploration(self):
        # Histogram of state visit counts
        visit_counts = list(self.visited_states.values())

        plt.figure(figsize=(10, 5))
        plt.subplot(1, 2, 1)
        plt.hist(visit_counts, bins=50)
        plt.xlabel('Visit Count')
        plt.ylabel('Number of States')
        plt.title('State Visit Distribution')

        # Reward over time
        plt.subplot(1, 2, 2)
        plt.plot(self.episode_rewards)
        plt.xlabel('Episode')
        plt.ylabel('Total Reward')
        plt.title('Learning Progress')

        plt.tight_layout()
        plt.savefig('exploration_stats.png')

    def coverage_stats(self):
        total_states = len(self.visited_states)
        novel_states = sum(1 for c in self.visited_states.values() if c == 1)

        print(f"Total unique states: {total_states}")
        print(f"Novel states (seen once): {novel_states}")
        print(f"Crashes found: {len(self.crashes_found)}")

RL-based automated exploration combines curiosity-driven learning with practical Vulkan application testing:

**Random Network Distillation**: Provides intrinsic rewards for discovering novel application states without requiring a score.

**PPO Agent**: Learns to navigate the application, balancing exploration (finding new states) with exploitation (repeating actions that led to rewards).

**Programmatic/External Control**: Interfaces with Vulkan applications to capture frames and inject input events.

**Multiple Use Cases**: CI bug discovery, automated benchmarking, demo mode, and general GUI automation.

**Practical CI Integration**: Run overnight in GitHub Actions to discover crashes and edge cases automatically.

This approach finds bugs humans wouldn’t think to test, explores performance characteristics automatically, and can even learn to demonstrate your application—all using ML techniques applied to real Vulkan applications.

[Previous: Real-Time Camera Integration](05_real_time_camera.html) | [Next: Ray Tracing Optimization](07_ray_tracing_optimization.html)
