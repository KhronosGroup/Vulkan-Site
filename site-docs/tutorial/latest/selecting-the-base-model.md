# Selecting the Base Model

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/03_model_selection_specialization/02_base_models.html

## Table of Contents

- [The graphics developer’s constraint](#_the_graphics_developers_constraint)
- [The_graphics_developer’s_constraint](#_the_graphics_developers_constraint)
- [How to evaluate a model](#_how_to_evaluate_a_model)
- [How_to_evaluate_a_model](#_how_to_evaluate_a_model)
- [1. VRAM cost: parameters vs. quantization](#_1_vram_cost_parameters_vs_quantization)
- [1._VRAM_cost:_parameters_vs._quantization](#_1_vram_cost_parameters_vs_quantization)
- [2. Reasoning depth](#_2_reasoning_depth)
- [2._Reasoning_depth](#_2_reasoning_depth)
- [3. Context window](#_3_context_window)
- [3._Context_window](#_3_context_window)
- [Current examples (as of writing)](#_current_examples_as_of_writing)
- [Current_examples_(as_of_writing)](#_current_examples_as_of_writing)
- [Qwen 3-Coder (30B): strong reasoning](#_qwen_3_coder_30b_strong_reasoning)
- [Qwen_3-Coder_(30B):_strong_reasoning](#_qwen_3_coder_30b_strong_reasoning)
- [Llama 4 (17B): low latency](#_llama_4_17b_low_latency)
- [Llama_4_(17B):_low_latency](#_llama_4_17b_low_latency)
- [Mistral-Nemo (12B): large context](#_mistral_nemo_12b_large_context)
- [Mistral-Nemo_(12B):_large_context](#_mistral_nemo_12b_large_context)
- [Interaction style: cloud vs. local](#_interaction_style_cloud_vs_local)
- [Interaction_style:_cloud_vs._local](#_interaction_style_cloud_vs_local)
- [Cloud models: high-level intent](#_cloud_models_high_level_intent)
- [Cloud_models:_high-level_intent](#_cloud_models_high_level_intent)
- [Local models: explicit instructions](#_local_models_explicit_instructions)
- [Local_models:_explicit_instructions](#_local_models_explicit_instructions)
- [Cloud-to-local: using one to brief the other](#_cloud_to_local_using_one_to_brief_the_other)
- [Cloud-to-local:_using_one_to_brief_the_other](#_cloud_to_local_using_one_to_brief_the_other)
- [Writing the handoff document](#_writing_the_handoff_document)
- [Writing_the_handoff_document](#_writing_the_handoff_document)
- [Why this is worth doing](#_why_this_is_worth_doing)
- [Why_this_is_worth_doing](#_why_this_is_worth_doing)
- [Picking a model per phase](#_picking_a_model_per_phase)
- [Picking_a_model_per_phase](#_picking_a_model_per_phase)
- [Summary](#_summary)

## Content

Choosing a base model for Vulkan development isn’t just about picking the largest one available. Graphics work has a specific constraint: every gigabyte of VRAM your model uses is a gigabyte unavailable for textures, vertex buffers, and framebuffers.

So the goal is a model that balances reasoning ability against a hardware footprint you can actually afford to keep running alongside your application.

The "best" model changes every few months, so it’s more useful to have criteria than to memorize a leaderboard. Three things matter most for graphics work:

The first question is whether the model fits on your hardware alongside your Vulkan application. Higher parameter counts generally mean better reasoning, but a 70B model isn’t worth it if it forces your application into slower system RAM.

Quantization (compression formats like GGUF or EXL2) makes larger models fit on consumer hardware. 4-bit (Q4) quantization is a common middle ground — it cuts memory footprint by roughly 75% with only a small drop in accuracy.

A reasonable test question: "Explain the synchronization requirements for a compute-to-graphics dependency where the compute shader writes to a storage buffer that is then used as a vertex buffer in the next pass."

A weaker model will often answer with a blanket `vkDeviceWaitIdle` or a generic barrier with no access masks specified. A stronger one will identify the need for a transition from `VK_ACCESS_SHADER_WRITE_BIT` to `VK_ACCESS_VERTEX_ATTRIBUTE_READ_BIT` and name the correct pipeline stages.

NB: This test, and any specific model recommendations, will age. Treat the criteria as durable and the named models as examples current at time of writing — expect to re-evaluate as new models ship. The model (and how much fine-tuning it gets) is really just another parameter you tune based on how much help a given task needs.

Vulkan engines have a lot of files. A model with a small context window (say, 4,000 tokens) will lose track of your memory allocator by the time it’s read through your pipeline setup. Look for at least 32k–128k tokens of context if you want the assistant to hold a renderer’s header files in view while working on a specific implementation.

These are current examples of models that illustrate the criteria above — expect the specific names to change.

Qwen 3-Coder (30B) is currently one of the stronger local, non-cloud coding models for C++.

**Example: a bindless texture refactor.** Moving an engine to bindless textures touches descriptor set layout bindings, `descriptorIndexing` features, and how GLSL access maps to SPIR-V. Given this task, Qwen 3-Coder can look at how your shaders use `sampler2D textures[]` and suggest the specific `DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT` flags needed to avoid validation errors, and it tends to catch synchronization issues that smaller models miss. That makes it a reasonable choice for architectural work and Vulkan 1.3/1.4 features — at the cost of roughly 20GB of VRAM at Q4_K_M, which realistically means a 24GB GPU or a local server.

For fast, inline feedback while typing, Llama 4 (17B) is a solid choice. It can predict the next several lines of a `VkPipelineShaderStageCreateInfo` array as you write it, correctly infer entry point names from project context, and set `pSpecializationInfo` to `nullptr` when it sees you aren’t using specialization constants.

At around 6GB of VRAM, it runs comfortably alongside a Vulkan application on mid-range hardware (12–16GB GPUs), which makes it a good fit for autocomplete, unit tests, and quick shader iteration.

Mistral-Nemo (12B), a joint NVIDIA/Mistral AI release, is tuned for efficient reasoning with a 128k context window.

**Example: an engine-wide refactor.** A global illumination system that touches the scene graph, several passes, and post-processing needs a model that can keep more than one file in view at a time. Because Mistral-Nemo can hold up to 128,000 tokens of context, it can read across a renderer’s header directory and give suggestions that stay consistent with the rest of the codebase — useful for large refactors and following class hierarchies that smaller models tend to lose track of. At roughly 8–10GB VRAM (Q4), it sits between the fast 17B models and the heavier 30B+ ones.

Cloud and local models expect to be talked to differently, and knowing which is which saves some frustration.

Cloud models like Claude 4.6 or GPT-5.3 handle abstraction well — you can talk to them roughly the way you’d talk to a colleague. If you say "I’m seeing Z-fighting on distant terrain, using a standard 24-bit depth buffer, what should I check first?", the model can infer you want the artifact fixed and suggest likely causes (depth precision, near/far plane ratio) without you spelling out your projection matrix setup.

Local models, even capable ones like Qwen 3-Coder (30B), generally need more specific instructions — they’re better treated as a skilled implementer working from a spec than as a conversational partner. A more effective local-model prompt: "I’m seeing Z-fighting. Check whether the near plane is too close (currently 0.01) or the far plane too distant (10000.0). Suggest a logarithmic depth buffer if the ratio exceeds 1:1,000,000, and provide the GLSL for the vertex shader update." Being explicit like this keeps a local model on track.

One workflow worth knowing: use a high-reasoning cloud model to write the technical spec, then hand that spec to a local model for implementation.

When planning with a model like Claude 4.6, instead of asking for code directly, ask it to produce an instruction document for a local assistant.

* 
**The workflow:**

Discuss the high-level goal with the cloud model (e.g., "I want to implement a GPU-driven culling system").

* 
Ask it to write a file, say `LLM_NOTES.md`, containing the exact structs, memory layout, and synchronization requirements just discussed, in explicit, unambiguous terms.

* 
Open `LLM_NOTES.md` in your IDE and point your local assistant (via Goose or Junie) at it. The local model now has a concrete spec to follow instead of having to infer your intent.

The cloud model does the translation from loosely specified intent to a precise spec, which saves you from writing that spec by hand; the local model then does the implementation without needing your proprietary code to leave the machine. This works best as a plan-then-implement split, and it’s really only worth the overhead for tasks big enough that writing the spec pays for itself — for something trivial, it may take the cloud model as long to write the spec as it would to just do the task itself.

NB: `LLM_NOTES.md` is a working document for the current session, not project documentation — it shouldn’t be checked into git.

This approach is most useful on longer tasks with multiple iterations, and it’s also a reasonable way to unstick a local model that’s gone in circles on a problem: a short cloud session can often get it back on track.

A reasonable default is to match the model to the phase of work, while treating these as fluid rather than fixed roles:

During **planning and system design**, use a high-reasoning cloud model or Qwen 3-Coder (30B) for things like a cross-platform frame graph or a thread-safe allocator, where reasoning depth matters more than speed. During **implementation and verification**, Mistral-Nemo (12B) or Qwen 3-Coder for turning the design into code that satisfies validation requirements. For **rapid iteration**, Llama 4 (17B) or a fast cloud model, where speed matters more than depth.

Model selection is mostly about matching reasoning depth to VRAM budget, and knowing when it’s worth paying for a cloud model’s reasoning versus running something local and fast. Using cloud models for planning, mid-sized local models for precise implementation work, and small fast models for the daily inner loop gives you a setup that’s responsive without being under-powered for the harder problems.

The main skill is treating model choice as something you actively adjust — scaling up or down, switching between local and cloud — based on what the current task actually needs, rather than sticking with one model for everything.

Next: [Hardware & VRAM Budgeting](03_hardware_vram.html)
