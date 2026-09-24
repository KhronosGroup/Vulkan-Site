# VUID Auto-Fix: Working Through Validation Layers

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/06_debugging/02_vuid_autofix.html

## Table of Contents

- [Introduction](#_introduction)
- [VUID, location, and spec context](#_vuid_location_and_spec_context)
- [VUID,_location,_and_spec_context](#_vuid_location_and_spec_context)
- [Example: a descriptor mismatch](#_example_a_descriptor_mismatch)
- [Example:_a_descriptor_mismatch](#_example_a_descriptor_mismatch)
- [Step 1: Ask with context](#_step_1_ask_with_context)
- [Step_1:_Ask_with_context](#_step_1_ask_with_context)
- [Step 2: Let it correlate shader and C++ code](#_step_2_let_it_correlate_shader_and_c_code)
- [Step_2:_Let_it_correlate_shader_and_C++_code](#_step_2_let_it_correlate_shader_and_c_code)
- [Step 3: Apply the fix](#_step_3_apply_the_fix)
- [Step_3:_Apply_the_fix](#_step_3_apply_the_fix)
- [Keeping the VUID list current](#_keeping_the_vuid_list_current)
- [Keeping_the_VUID_list_current](#_keeping_the_vuid_list_current)
- [Practical steps: performing a VUID auto-fix](#_practical_steps_performing_a_vuid_auto_fix)
- [Practical_steps:_performing_a_VUID_auto-fix](#_practical_steps_performing_a_vuid_auto_fix)
- [Step 1: Isolate and load context](#_step_1_isolate_and_load_context)
- [Step_1:_Isolate_and_load_context](#_step_1_isolate_and_load_context)
- [Step 2: Ask for the correlation](#_step_2_ask_for_the_correlation)
- [Step_2:_Ask_for_the_correlation](#_step_2_ask_for_the_correlation)
- [Step 3: Verify before applying](#_step_3_verify_before_applying)
- [Step_3:_Verify_before_applying](#_step_3_verify_before_applying)
- [Summary](#_summary)

## Content

Vulkan **Validation Layers** are one of the most useful tools you have — they catch a huge range of errors, from bad struct sizes to subtle synchronization hazards. But a single validation error can be dense enough to be hard to parse, especially if you’re newer to Vulkan.

An AI assistant can help by correlating the VUID (Valid Usage ID) with your actual C++ source to suggest a specific fix, rather than leaving you to decode the error string on your own.

A useful auto-fix workflow combines three pieces of information: the **VUID** itself (a stable identifier for a specific rule in the Vulkan Specification), the **location** in your C++ source where the offending call happens, and the **spec context** — the actual rule text, which an MCP server can pull live from `vk.xml` so the assistant isn’t relying on outdated training data.

With all three, the assistant can tell you not just that there’s a type mismatch, but that your shader expects a `storage_buffer` because you’re writing to it, while your C++ code declares it as a `uniform_buffer` — and propose a fix consistent with the rest of your code.

Say you’re implementing a bindless texture system, and you run the app to see this:

VALIDATION ERROR: [ VUID-VkDescriptorSetLayoutBinding-descriptorType-01510 ]
Object: 0x5555559868f0 | Message: pBindings[0].descriptorType is VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER
but shader expects VK_DESCRIPTOR_TYPE_STORAGE_BUFFER...

Give the assistant the error and the relevant code, not just the error alone.

**Prompt:** **"I am getting this VUID: [PASTE ERROR]. Here is my `DescriptorSetLayout` creation code: [PASTE CODE]. Based on our engine’s `Buffer` class, why is this type mismatch occurring?"**

With RAG access to your shader code and your C++ initialization, a reasonable response looks like:

**"Your shader is expecting a `storage_buffer` because you are writing to it in the fragment stage. However, your C++ code is initializing it as a `uniform_buffer`. You must update the descriptor type to `STORAGE_BUFFER` and ensure your `VkBufferUsageFlags` include the `STORAGE_BUFFER_BIT`."**

A good assistant will give you the change in the style of your existing RAII wrappers, and will flag secondary effects — for example, that this change might push you over your `maxDescriptorSetStorageBuffers` limit, which is easy to miss even for an experienced developer.

One genuinely useful part of this workflow is having MCP query the live Vulkan spec, as covered in [The Context Bridge](../02_environment_setup/06_mcp_context_bridge.html). Your assistant can read the `vk.xml` file on disk directly, so a VUID introduced in a newer Vulkan version is available to it the same day you update your SDK, regardless of when the underlying model was trained.

Copy the VUID string from your terminal, then make sure the relevant code is loaded into your assistant (Goose or IDE chat).

# Example: Pointing Goose to the renderer and shader code
goose session --instruction "Analyze Renderer.cpp and main.frag. We have a VUID error to solve."

Provide the exact error and ask for it to be checked against your engine’s logic.

I am encountering this validation error:
[ VUID-VkDescriptorSetLayoutBinding-descriptorType-01510 ]
Message: pBindings[0].descriptorType is VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER
but shader expects VK_DESCRIPTOR_TYPE_STORAGE_BUFFER.

Based on our 'DescriptorSetManager' class, why is this mismatch occurring?

Before applying a suggested fix, ask it to check for side effects elsewhere in the pipeline.

Explain why changing to STORAGE_BUFFER resolves this rule.
Will this require any changes to our memory alignment logic or
buffer usage flags in 'Buffer.cpp'?

Apply the fix and re-run your application. If the validation layer stays quiet, the fix worked.

In an IDE chat interface, this often reduces to pasting the VUID and letting the assistant find and fix the issue directly — it’s a fast path that works well for common cases. The explicit prompt structure above is worth using with local models, which tend to do better with a clearly scoped request than with an open-ended "fix this."

Using AI to bridge validation errors and source code cuts out a lot of the manual cross-referencing between the spec, the error string, and your code. It’s still worth checking the reasoning, especially for anything touching memory layout or synchronization — but for routine VUID triage, it saves real time.

Next: [AI + RenderDoc Integration](03_renderdoc_ai_integration.html)
