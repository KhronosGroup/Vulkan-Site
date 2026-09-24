# The Vulkan Registry & GPUInfo MCP

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/07_advanced_mcp/02_vulkan_registry_mcp.html

## Table of Contents

- [Introduction: Working from the source data](#_introduction_working_from_the_source_data)
- [Introduction:_Working_from_the_source_data](#_introduction_working_from_the_source_data)
- [Querying the registry with mcp-Vulkan](#_querying_the_registry_with_mcp_vulkan)
- [Querying_the_registry_with_mcp-Vulkan](#_querying_the_registry_with_mcp_vulkan)
- [Building a GPUInfo MCP server](#_building_a_gpuinfo_mcp_server)
- [Building_a_GPUInfo_MCP_server](#_building_a_gpuinfo_mcp_server)
- [Step 1: Setting up the environment](#_step_1_setting_up_the_environment)
- [Step_1:_Setting_up_the_environment](#_step_1_setting_up_the_environment)
- [Step 2: Defining the server logic](#_step_2_defining_the_server_logic)
- [Step_2:_Defining_the_server_logic](#_step_2_defining_the_server_logic)
- [Step 3: Registering with your AI agent](#_step_3_registering_with_your_ai_agent)
- [Step_3:_Registering_with_your_AI_agent](#_step_3_registering_with_your_ai_agent)
- [Example: checking a bindless design against hardware limits](#_example_checking_a_bindless_design_against_hardware_limits)
- [Example:_checking_a_bindless_design_against_hardware_limits](#_example_checking_a_bindless_design_against_hardware_limits)
- [Summary](#_summary)

## Content

Vulkan is a data-driven API. Its structs, enums, and extensions are all defined in a central XML file, the **Vulkan Registry (`vk.xml`)**. Similarly, the capabilities of thousands of GPUs are tracked in the **Vulkan Hardware Database (`gpuinfo.org`)**.

Giving your AI direct access to these sources means it can look up an answer instead of guessing from training data, which matters most for anything added or changed recently. This chapter covers using an existing MCP server for the registry, and building your own small connector for `gpuinfo.org`.

The **mcp-Vulkan** project is an MCP server built around `vk.xml`. It exposes tools like `search-vulkan-docs` and `get-vulkan-topic` to your AI agent.

This matters most for extensions released after a model’s training cutoff. If you’re implementing something like `VK_KHR_maintenance7` and the model wasn’t trained on it, it may guess at structure or flag names. With `search-vulkan-docs` wired up via mcp-Vulkan, the AI can query the current spec directly and return the actual structure name — e.g., `VkPhysicalDeviceMaintenance7FeaturesKHR` — instead of inventing something plausible-looking.

`mcp-Vulkan` covers the official spec, but connecting to the **Vulkan Hardware Database (`gpuinfo.org`)** needs a small custom server, since it’s a community-run site rather than a structured API. Below is a minimal Python MCP server that gives your assistant a `query_gpu_limit` tool for checking hardware constraints during design.

Create a new directory for your MCP server and install the dependencies: `mcp` for the protocol, and `requests` for fetching data.

mkdir gpuinfo-mcp && cd gpuinfo-mcp
python -m venv venv
source venv/bin/activate
pip install mcp requests

Create a file named `server.py`. It initializes an `McpServer` and defines a tool that takes a GPU name and a limit name (like `maxDescriptorSetSampledImages`) and returns the corresponding value.

import requests
from mcp.server import McpServer
from mcp.types import Tool

# Initialize the server
server = McpServer("GPUInfo-Connector")

@server.tool()
def query_gpu_limit(gpu_name: str, limit_name: str) -> str:
    """
    Queries gpuinfo.org for a specific hardware limit of a given GPU.
    """
    # In a real-world scenario, you would use a search API
    # For this tutorial, we simulate a database lookup logic
    search_url = f"https://vulkan.gpuinfo.org/listreports.php?devicename={gpu_name.replace(' ', '+')}"

    # The AI will receive this URL and can use a browser-mcp to navigate it,
    # or this tool can parse the latest report for that device.
    return f"Searching gpuinfo.org for '{limit_name}' on '{gpu_name}'. Accessing reports at: {search_url}"

if __name__ == "__main__":
    server.run()

To use this tool, add the server to your agent’s configuration. If you’re using **Goose**, add this to `~/.config/goose/config.yaml`:

extensions:
  gpuinfo:
    cmd: python
    args: ["/path/to/gpuinfo-mcp/server.py"]

Say you’re designing a bindless rendering setup and ask your assistant: "What’s the `maxDescriptorSetSampledImages` limit on the Adreno 600 series, and does a 1024-texture bindless array fit?"

With the GPUInfo MCP server connected, the assistant can call `query_gpu_limit` and report the actual figure (128 on many Adreno 600 devices) instead of guessing — which in this case would mean your 1024-texture plan doesn’t fit that hardware. From there it can suggest an alternative, like a tiled descriptor strategy or a mobile-specific fallback path, though it’s worth checking any such suggestion against your actual constraints before committing to it.

Connecting your AI to the Vulkan Registry and a GPUInfo lookup tool means it’s working from the same live data professional graphics engineers check by hand, rather than from whatever it happened to see in training. It still won’t catch everything, and it’s still worth verifying anything load-bearing, but it cuts out a lot of the manual copy-paste lookup work.

Next: [Agentic Automation & Audits](03_agentic_automation_qa.html)
