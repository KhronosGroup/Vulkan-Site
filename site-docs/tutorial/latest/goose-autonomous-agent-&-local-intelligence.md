# Goose: Autonomous Agent & Local Intelligence

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/02_environment_setup/05_goose_native_agent.html

## Table of Contents

- [Introduction](#_introduction)
- [What makes it an agent rather than an assistant](#_what_makes_it_an_agent_rather_than_an_assistant)
- [What_makes_it_an_agent_rather_than_an_assistant](#_what_makes_it_an_agent_rather_than_an_assistant)
- [Installing Goose](#_installing_goose)
- [1. Installation](#_1_installation)
- [2. Starting a session](#_2_starting_a_session)
- [2._Starting_a_session](#_2_starting_a_session)
- [Filesystem access (MCP)](#_filesystem_access_mcp)
- [Filesystem_access_(MCP)](#_filesystem_access_mcp)
- [Splitting work between cloud and local models](#_splitting_work_between_cloud_and_local_models)
- [Splitting_work_between_cloud_and_local_models](#_splitting_work_between_cloud_and_local_models)
- [1. Planning with a cloud model](#_1_planning_with_a_cloud_model)
- [1._Planning_with_a_cloud_model](#_1_planning_with_a_cloud_model)
- [2. Implementation with a local model](#_2_implementation_with_a_local_model)
- [2._Implementation_with_a_local_model](#_2_implementation_with_a_local_model)
- [3. Putting it together](#_3_putting_it_together)
- [3._Putting_it_together](#_3_putting_it_together)
- [Permissions in VS Code](#_permissions_in_vs_code)
- [Permissions_in_VS_Code](#_permissions_in_vs_code)
- [VRAM budgeting](#_vram_budgeting)
- [A rough budget](#_a_rough_budget)
- [A_rough_budget](#_a_rough_budget)
- [Quantization](#_quantization)
- [When to use which tool](#_when_to_use_which_tool)
- [When_to_use_which_tool](#_when_to_use_which_tool)
- [Summary](#_summary)

## Content

IDE-integrated assistants (JetBrains AI, Copilot) focus on real-time suggestions inside your editor. **Goose** is a different category of tool: an agent that can act on your project directly — running commands, editing multiple files, checking the build — rather than just producing snippets for you to paste in.

This chapter is the common point for all three IDE paths (CLion, Visual Studio, Xcode) — the agent setup here is the same regardless of which one you use.

The practical difference is whether the tool just proposes code or actually does something with it. A chat-based assistant gives you a snippet for a new `VkDescriptorPool` that you copy in and fix up yourself. An agent can be told to add that pool to `VulkanContext.cpp` and then actually run the build to check it compiles — it reads your headers, writes the code, opens a terminal, runs `cmake`, and iterates on any errors it introduced.

This is a genuinely useful capability, but it’s also one where you want to stay in the loop on what it changed, especially for anything touching synchronization or memory lifetime — the earlier chapters covered IDE-integrated agents that stay closer to your review process; a system-level agent like Goose has broader reach (it can talk to an external RenderDoc instance, tweak system configuration) and correspondingly less built-in oversight.

**macOS and Linux:**

curl -fsSL https://block.github.io/goose/install.sh | bash

**Windows:**
A PowerShell installer exists, but for more control, install manually:

Go to [goose-docs.ai](https://goose-docs.ai/) and download the Goose executable.

Unzip it into a permanent location (e.g., `C:\Programs\Goose`).

Pin `goose.exe` to your Start menu.

If you need to edit configuration manually, `config.yaml` is typically at `C:\Users\[YourUserName]\AppData\Roaming\Block\goose\config\config.yaml`.

Start a session from your project root:

cd /path/to/your/vulkan_project
goose session

From here you can add **tools** (via MCP) that let Goose read your filesystem, run shell commands, and search the Vulkan specification.

To give Goose reliable access to your local files:

**Install Node.js:** the LTS installer from [nodejs.org](https://nodejs.org/). Verify with `node --version` and `npm --version`.

**Add the extension in Goose:** go to **Extensions → Add Custom Extension**:

* 
**Extension Name:** `Filesystem Access`

* 
**Type:** `STDIO`

* 
**Description:** `Allows goose to access project files.`

* 
**Command:** `npx -y @modelcontextprotocol/Filesystem_Access [filepath]` (replace `[filepath]` with your project path, forward slashes, e.g. `C:/Users/Dev/VulkanProject`).

* 
**Timeout:** `300`

**Restart Goose** to load the extension.

A hybrid setup — cloud model for planning, local model for implementation — tends to work better than picking one for everything, since the two categories are good at different things and cost very different amounts.

For initial session setup and harder architectural planning, a cloud model (**Claude 4.6**, **GPT-5.3**) is generally worth the cost — this is where the model needs to actually reason about the design, not just produce plausible-looking code.

To configure a cloud provider in Goose:

Open Goose Settings → Models → Configure Providers.

Select **Anthropic**. You’ll need an API key from the [Claude Console](https://platform.claude.com/) — paste it and submit.

Once you have a plan, switching to a local model via **Ollama** for the actual implementation work is free and keeps the code on your machine.

**Setting up Ollama:**

Download the installer from [ollama.com](https://ollama.com).

Pick a model storage location with enough free space.

Pull the models you’ll want:

# Download the 17B model (Llama 4) for low-latency coding
ollama run llama4

# Download the 30B Qwen model for complex architectural implementation
# NOTE: qwen3-coder:30b requires 20+ GB of VRAM even at 4-bit quantization.
# Most consumer GPUs (16 GB or less) will not have sufficient VRAM when a
# Vulkan application is also running. Use qwen3-coder:14b as a practical
# alternative on systems with 16 GB or less.
ollama run qwen3-coder:30b

# Download the 12B Mistral-Nemo model for balanced reasoning and context
ollama run mistral-nemo

**Connect to Goose:** in Goose Settings → Models → Configure Providers, find **Ollama**, and pick your model (e.g. `qwen3-coder:14b`) from the dropdown.

In practice, this means starting a session with the cloud model to draft a plan — for example, analyzing your current `VulkanContext` for a shadow-mapping feature — and then switching to the local Ollama profile to have Goose implement that plan. This keeps VRAM free for the cloud-planning phase and reserves the (free, but slower to iterate on correctness) local model for implementation, where mistakes are cheaper to catch.

If you’re using Goose (or another agent, like Claude Code) inside VS Code, you’ll normally be prompted for permission on every command. To skip that:
1.  Press `Ctrl + ,` to open Settings.
2.  Search for `permissions`.
3.  Set **Initial Permission Mode** to `bypassPermissions` for your AI extension.
4.  Enable **Allow Dangerously Skip Permissions**.
**Caution:** only do this in an environment you can afford to have modified without confirmation — a VM or container, not your main machine — since it lets the agent run scripts and edit files unattended.

Running a local model alongside a Vulkan application means both are competing for the same GPU memory, so it’s worth doing the arithmetic before you start.

For a machine with 16GB of VRAM: a modern deferred renderer at 1440p might use ~4.5GB, and OS/IDE overhead another ~1.5GB, leaving roughly 10GB for a local model (`16 - (4.5 + 1.5) = 10GB`).

Quantization reduces a model’s memory footprint, and Ollama handles it automatically, but the tradeoff is worth knowing. **4-bit (Q4_K_M)** is usually the reasonable default — about 75% smaller than full precision, with a modest (roughly 5%) drop in output quality. **8-bit (Q8_0)** is more accurate but needs considerably more VRAM.

|  | Even at 4-bit quantization, `qwen3-coder:30b` needs roughly 20GB of VRAM — more than most consumer GPUs have. On a 16GB GPU running a Vulkan application at the same time, this won’t fit. Use `qwen3-coder:14b` (~9GB at Q4_K_M) instead if you’re on a 16GB budget. |
| --- | --- |

If you run out of VRAM, you risk a **TDR (Timeout Detection and Recovery)** event, which can crash both the model and your Vulkan renderer. Leave a 1–2GB safety margin.

Use your **IDE assistant** (JetBrains AI, Copilot) for inner-loop work — autocomplete, explaining code, fixing syntax errors in the current file. Switch to **Goose** for outer-loop work that spans files — adding a new `PostProcess` class, or an engine-wide migration from raw pointers to smart pointers.

At this point, regardless of which IDE you started from, you should have Goose set up as a system-level agent, a local model running through Ollama, and a VRAM budget that leaves room for your Vulkan application. The remaining chapters treat this setup as the baseline.

Next: [The Context Bridge (MCP)](06_mcp_context_bridge.html).

[Previous: Environment Introduction](01_introduction.html) |  [Next: The Context Bridge (MCP)](06_mcp_context_bridge.html)
