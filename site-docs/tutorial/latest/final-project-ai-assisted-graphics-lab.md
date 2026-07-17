# Final Project: AI-Assisted Graphics Lab

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/10_final_project.html

## Table of Contents

- [Introduction](#_introduction)
- [The Project: A Dual-Filtering Blur System](#_the_project_a_dual_filtering_blur_system)
- [The_Project:_A_Dual-Filtering_Blur_System](#_the_project_a_dual_filtering_blur_system)
- [Tutorial: Setting up the Graphics Lab](#_tutorial_setting_up_the_graphics_lab)
- [Tutorial:_Setting_up_the_Graphics_Lab](#_tutorial_setting_up_the_graphics_lab)
- [Step 1: Loading the Engine Context](#_step_1_loading_the_engine_context)
- [Step_1:_Loading_the_Engine_Context](#_step_1_loading_the_engine_context)
- [Step 2: The Architectural Design Prompt](#_step_2_the_architectural_design_prompt)
- [Step_2:_The_Architectural_Design_Prompt](#_step_2_the_architectural_design_prompt)
- [Step 3: Implementation and Refactoring](#_step_3_implementation_and_refactoring)
- [Step_3:_Implementation_and_Refactoring](#_step_3_implementation_and_refactoring)
- [Step 4: The Performance Audit](#_step_4_the_performance_audit)
- [Step_4:_The_Performance_Audit](#_step_4_the_performance_audit)
- [Step 5: Autonomous CI/CD and Unit Testing](#_step_5_autonomous_cicd_and_unit_testing)
- [Step_5:_Autonomous_CI/CD_and_Unit_Testing](#_step_5_autonomous_cicd_and_unit_testing)
- [Step 6: Multi-Frame Analysis with GFXReconstruct](#_step_6_multi_frame_analysis_with_gfxreconstruct)
- [Step_6:_Multi-Frame_Analysis_with_GFXReconstruct](#_step_6_multi_frame_analysis_with_gfxreconstruct)
- [Step 7: Visual Frame Inspection with RenderDoc](#_step_7_visual_frame_inspection_with_renderdoc)
- [Step_7:_Visual_Frame_Inspection_with_RenderDoc](#_step_7_visual_frame_inspection_with_renderdoc)
- [Summary](#_summary)

## Content

By this point you’ve set up your environment, worked with different models, gone through a design-implement-review cycle, and used AI to help with debugging and deployment. This final project brings those pieces together on one feature, end to end.

You’ll work within the **Simple Engine** (found in `attachments/simple_engine/` from the Building a Simple Engine tutorial), using a cloud model for design, a local model for implementation, and RenderDoc/GFXReconstruct-driven review to verify the result.

You will implement a high-performance **Dual-Filtering Blur** system (based on the techniques used in modern AAA engines). This is more complex than a standard Gaussian blur; it requires a chain of downsample and upsample passes, intricate synchronization barriers, and precise texture sampling logic.

To begin your final project, you must set up a clean workspace and prepare your AI assistants with the necessary engine context. Follow these steps to initiate the system design phase.

Provide your AI assistant (Goose or IDE Chat) with the core files of the **Simple Engine**. This ensures the AI understands your specific RAII wrappers, resource management logic, and established coding patterns. Before you begin, ensure your **mcp-Vulkan** and **GPUInfo** MCP servers are active in your configuration. This allows the assistant to cross-reference your code with the official specification and hardware limits in real-time.

# Example: Loading context and MCP tools into Goose
goose session --instruction "Analyze renderer.h and vulkan_device.h. We are implementing a Dual-Filtering Blur system. Use the 'vulkan' MCP to verify spec compliance for all synchronization logic."

Use a high-reasoning model (like **Claude 4.6** or **GPT-5.3**) to design the system. Ask for a **Technical Roadmap** that includes the resource lifecycle and synchronization chain, specifically targeting the `vk::raii` (Vulkan-HPP) wrappers used in the engine. **Instruct the model to format its response as a concise, technical 'Contract' and save this output locally as `LLM_NOTES.md`.**

We are implementing a Dual-Filtering Blur system in our
Vulkan 1.4 engine (Simple Engine). Based on our
'vk::raii::Image' and 'vk::raii::Buffer' usage in
'renderer.h', design a roadmap for:

1. Resource Lifecycle: How many downsample/upsample images
   do we need for a 5-tap blur?
2. Synchronization: Define the 'vk::ImageMemoryBarrier2'
   transitions between each pass using the 'vulkan-raii'
   paradigm. Use the 'search-vulkan-docs' MCP tool to confirm
   the latest layout transition rules for Vulkan 1.4.
3. Hardware Constraints: Use the 'query_gpu_limit' tool (via
   the 'gpuinfo' MCP) to verify if 'maxDescriptorSetSampledImages'
   on common mobile GPUs supports our proposed strategy.
4. Shader Logic: Suggest a Slang/HLSL implementation
   for the downsample tap.

Format this entire response as a technical contract
for an implementation model and save it to LLM_NOTES.md.

Once the design is reviewed and your `LLM_NOTES.md` is ready, have a local model (like **Qwen 3-Coder**) generate the `BlurRenderer` header and implementation. Passing the notes as direct context lets the local model follow the agreed design without needing a cloud model for the bulk of the implementation work.

# Example: Using Goose with the local Qwen specialist and design notes
goose session --instruction "Read LLM_NOTES.md. Based on this technical contract, implement the 'BlurRenderer' class. Ensure you use 'vk::raii' structures and follow the engine's modular pattern."

// Example: AI-generated pipeline creation based on the contract
vk::raii::Pipeline BlurRenderer::createDownsamplePipeline() {
    vk::GraphicsPipelineCreateInfo pipelineInfo = {};
    // AI will fill in the shader stages, vertex input, etc.
    // using the engine's existing resource managers.
}

Finally, use an autonomous agent (like **Goose**) to perform a performance scan of your new feature.

Goose, audit 'BlurRenderer::recordCommands'.
Look for redundant descriptor set updates or any
barriers that are preventing GPU overlap between
the downsample and upsample stages.

To ensure your new feature remains stable across future engine updates, you must integrate it into your continuous integration pipeline. Use your autonomous agent to generate comprehensive unit tests for the `BlurRenderer` and then update your CI configuration to execute these tests on every push.

Goose, create a new unit test file 'tests/blur_renderer_test.cpp'.
The test should verify the 'BlurRenderer' resource allocation
and ensure that the downsample mip-chain dimensions are calculated
correctly for a 1080p input. Once created, update our
GitHub Actions workflow in '.github/workflows/main.yml' to
include a new step that compiles and runs this test.

Having the AI write the test and update the CI config alongside the implementation means test coverage doesn’t lag behind the feature itself.

Verifying synchronization across the whole blur pass-chain usually means looking across several frames, not just one. Use **GFXReconstruct** to capture a stream of API calls and have your agent check layout transitions across that range. This catches race conditions or incorrect image layout transitions that only show up intermittently or during the first few frames of initialization.

# 1. Capture the trace of your new blur implementation
VK_INSTANCE_LAYERS=VK_LAYER_LUNARG_gfxreconstruct ./SimpleEngine

# 2. Convert a specific frame range to JSON for the AI to reason about
# We focus on a small range to stay within the model's context window
gfxrecon-convert --to-json --frames 5-10 capture.gfxr blur_trace.json

Goose, I have provided 'blur_trace.json' which contains
the API stream for our Dual-Filtering Blur system.
Perform a 'Synchronization Audit':

1. Identify all 'vkCmdPipelineBarrier2' calls related to
   the 'Blur_Downsample_Mip' images.
2. Verify that the 'oldLayout' in frame 6 matches the
   'newLayout' set at the end of frame 5.
3. Use the 'vulkan' MCP to confirm that we aren't
   performing any redundant 'UNDEFINED' transitions
   that would discard tile memory on mobile GPUs.

If you find a hazard, suggest the specific line in
'BlurRenderer.cpp' that needs adjustment.

Auditing the full call stream this way is what tells you whether the engine is actually spec-compliant, rather than just happening to work on your current driver.

Where GFXReconstruct covers the multi-frame timeline, **RenderDoc** lets you inspect the visual state of a single frame in detail. Use the **RenderDoc command-line tool (`renderdoccmd`)** together with your agent to verify that each downsample and upsample pass produces the expected output. This is especially useful for tracking down black textures or sampling artifacts caused by incorrect sampler settings.

# 1. Capture a frame from your blur implementation
# (Assuming RenderDoc is configured to capture on 'F12' or similar)
./SimpleEngine --capture-frame 60

# 2. Command Goose to perform a visual state audit
# Note: We use rdc-cli to export the draw call list and pipeline state

Goose, analyze 'capture_frame_60.rdc' using 'renderdoccmd'.
We are looking for the 'Blur_Downsample_Pass_2' draw call.

1. List all draw calls and find the one that binds
   the 'downsample_mip_1' texture as an input.
2. Export the 'VkSampler' state for this draw call.
3. Compare the 'minLod' and 'maxLod' settings in the
   capture against our 'SamplerBuilder' in 'renderer_utils.cpp'.
4. Check if the 'fragment shader' output is consistently zero.

If you find a mismatch, explain how to refactor the
'createSampler' logic to ensure we aren't sampling
beyond the available mip-levels.

Feeding RenderDoc captures to the agent turns "why is this texture black" from a guessing game into a direct trace: the AI identifies the specific state mismatch, like a misconfigured LOD clamp, and points at the line of code that produced it.

Completing this lab means you’ve practiced the full loop on a real feature: a cloud model for architecture, a local model for implementation, and RenderDoc/GFXReconstruct for verification.

AI assistance does not replace the need to understand Vulkan; it reduces the time spent on boilerplate and repetitive lookups so you can focus on the decisions that matter. The Vulkan specification remains your authoritative reference, and your judgment as an engineer remains the critical ingredient. What changes is how efficiently you can navigate that specification and iterate on your implementation.

Next: [Main Tutorial Conclusion](../conclusion.html)
