# MCP & RAG Specialization

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/03_model_selection_specialization/04_rag_mcp_specialization.html

## Table of Contents

- [The training-cutoff problem](#_the_training_cutoff_problem)
- [The_training-cutoff_problem](#_the_training_cutoff_problem)
- [Two kinds of context](#_two_kinds_of_context)
- [Two_kinds_of_context](#_two_kinds_of_context)
- [MCP: connecting to the spec](#_mcp_connecting_to_the_spec)
- [MCP:_connecting_to_the_spec](#_mcp_connecting_to_the_spec)
- [RAG: connecting to your codebase](#_rag_connecting_to_your_codebase)
- [RAG:_connecting_to_your_codebase](#_rag_connecting_to_your_codebase)
- [How a RAG pipeline works](#_how_a_rag_pipeline_works)
- [How_a_RAG_pipeline_works](#_how_a_rag_pipeline_works)
- [Phase 1: curating source documents](#_phase_1_curating_source_documents)
- [Phase_1:_curating_source_documents](#_phase_1_curating_source_documents)
- [Phase 2: embedding and indexing](#_phase_2_embedding_and_indexing)
- [Phase_2:_embedding_and_indexing](#_phase_2_embedding_and_indexing)
- [Phase 3: retrieval](#_phase_3_retrieval)
- [Phase_3:_retrieval](#_phase_3_retrieval)
- [Phase 4: augmentation](#_phase_4_augmentation)
- [Phase_4:_augmentation](#_phase_4_augmentation)
- [Building a knowledge index](#_building_a_knowledge_index)
- [Building_a_knowledge_index](#_building_a_knowledge_index)
- [Step 1: organize a docs directory](#_step_1_organize_a_docs_directory)
- [Step_1:_organize_a_docs_directory](#_step_1_organize_a_docs_directory)
- [Step 2: manual retrieval with Goose](#_step_2_manual_retrieval_with_goose)
- [Step_2:_manual_retrieval_with_Goose](#_step_2_manual_retrieval_with_goose)
- [Step 3: vector indexing at scale](#_step_3_vector_indexing_at_scale)
- [Step_3:_vector_indexing_at_scale](#_step_3_vector_indexing_at_scale)
- [Step 4: knowledge graphs for structure](#_step_4_knowledge_graphs_for_structure)
- [Step_4:_knowledge_graphs_for_structure](#_step_4_knowledge_graphs_for_structure)
- [Step 5: a function registry](#_step_5_a_function_registry)
- [Step_5:_a_function_registry](#_step_5_a_function_registry)
- [Small models with a good RAG index can compete with far larger ones](#_small_models_with_a_good_rag_index_can_compete_with_far_larger_ones)
- [Small_models_with_a_good_RAG_index_can_compete_with_far_larger_ones](#_small_models_with_a_good_rag_index_can_compete_with_far_larger_ones)
- [Summary](#_summary)

## Content

Even a strong base model like Qwen 3-Coder only knows what existed in its training data. If the Vulkan working group ships a new extension today, the model won’t know about it — and it may confidently invent struct members or bitmasks that don’t exist, which can cost real debugging time.

MCP and RAG are the two main ways to give a model access to information beyond its training data.

It helps to separate two kinds of knowledge a model needs:

**The Vulkan spec itself** — the same for every developer. This is what MCP connects the model to.

**Your engine’s specific conventions** — private to your project, and something no general-purpose model was trained on. This is what RAG connects the model to.

The Model Context Protocol lets your AI query real-time data instead of relying only on training data.

**Example.** Say you need the valid `VkImageUsageFlags` for a storage image on Android. Instead of looking it up yourself, you ask the assistant to query your local SDK’s `vk.xml` for it. Rather than guessing from training data, the assistant reads the actual XML file and returns the real bitmask definitions — correct even for extensions released yesterday.

Where MCP handles structured spec data, RAG handles your own source, internal docs, and architectural conventions.

**Example.** You’re writing a new `Buffer` wrapper and want it to match your existing `Texture` class’s style. With RAG set up, you ask the assistant to use `Texture` as a reference and generate a `Buffer` class following the same RAII and allocation patterns. Instead of a generic C++ class, the system retrieves your actual `Texture` implementation and generates something that matches your codebase’s existing conventions, without retraining the underlying model.

Understanding the pipeline is useful because it’s how you turn a general-purpose model into something that knows your engine specifically, using only your local files.

Identify the documents worth indexing for your engine:

* 
**Header files** (`.h`, `.hpp`, etc.) — your internal API surface.

* 
**Engineering guidelines** — docs covering memory management or synchronization conventions.

* 
**External docs** — local copies of third-party library manuals (Slang, VMA, Volk, SDL3) or vendor optimization guides not already covered by MCP tools.

NB: There’s a tradeoff between index breadth and retrieval speed — a wider index can be more accurate but slower to query, and it also costs tokens, leaving less budget for the actual work in a session. Keep the index focused rather than indexing everything.

**Chunking:** files are split into smaller overlapping pieces (a function, a class definition).

**Embeddings:** a small embedding model (`bge-small-en`, `nomic-embed-text`) converts each chunk into a vector.

**Vector database:** vectors are stored so that conceptually similar chunks (e.g. `VkBuffer` and `VkImage` creation code) end up near each other.

A query is converted to a vector and matched against the nearest stored chunks. Asking about "pipeline barriers" retrieves the files in your engine that actually handle synchronization.

The retrieved chunks get added to the prompt as context before the model generates a response:

Context: [Your engine's Buffer.cpp code]
Context: [The VMA Reference for allocation]
User Prompt: Create a new vertex buffer for our triangle.

Many IDE plugins automate this, but it’s worth setting up something more transparent using tools already covered in the environment section.

Index a specific, curated directory rather than your whole home folder:

/vulkan_project
  /docs
    /vma_library_reference.md
    /engine_architecture.md
    /naming_conventions.md
  /src
    (Your engine code)

Instead of relying on a hidden plugin, you can do RAG explicitly with Goose.

**Load context.** Before asking for code, tell the agent what to read:

Goose, read 'docs/naming_conventions.md' and
'src/core/Buffer.hpp'. We are going to implement
a new Index Buffer class.

**Ask, referencing what you loaded:**

Using our naming conventions and the RAII pattern
seen in 'Buffer.hpp', generate 'IndexBuffer.hpp'
and 'IndexBuffer.cpp'. Ensure it uses 'vmaCreateBuffer'
for allocation.

This works because you’re doing the retrieval step yourself, and MCP (via Goose) lets the agent read your actual files as ground truth rather than guessing at your conventions.

If your project grows to thousands of files, manual retrieval gets slow. At that point a local vector database (ChromaDB, Pinecone, via MCP) lets the AI search the whole engine in milliseconds even without knowing the exact filename.

Vector search is good at finding similar text; a knowledge graph is better at finding related structure — for instance, tracing which `VkCommandPool` was created by which `VkDevice`. Indexing your project as a graph lets you ask things like "show me all systems that depend on `GlobalDescriptorSet`" and get back not just the classes that use it, but the shaders and barriers logically linked to it.

A function registry is a lookup of capabilities the AI can call on, rather than reimplement. If you ask it to capture a frame, it can check whether your engine already has a `RenderDoc::CaptureFrame()` method and use that instead of writing a new capture system from scratch.

**Tip: using a cloud model to prep the RAG source.** You can use a stronger cloud model to do the initial curation — summarizing your renderer’s conventions into a single markdown file that a smaller local model can then retrieve from, getting some of the larger model’s understanding without the VRAM cost.

A model in the 7B–30B range, given a good RAG index of your codebase, can outperform a much larger general-purpose model on tasks specific to your engine — because it isn’t spending its limited attention trying to recall your class names from training; the index handles that, and the model can focus on reasoning about the logic in front of it.

Combining a base model’s pre-trained knowledge with MCP’s access to the current spec and RAG’s access to your own codebase gives you an assistant that’s aware of both the Vulkan spec and your specific engine.

* 
MCP handles the spec.

* 
RAG handles your project’s conventions.

The next chapter covers fine-tuning with LoRA — a further step for baking your engine’s conventions directly into a model’s weights, and deploying that to a shared team server.

Next: [Fine-Tuning for Your Engine (LoRA)](05_fine_tuning_lora.html)
