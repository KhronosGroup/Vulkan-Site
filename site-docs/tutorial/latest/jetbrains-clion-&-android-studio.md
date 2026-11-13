# JetBrains CLion & Android Studio

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/AI_Assisted_Vulkan/02_environment_setup/02_jetbrains_clion_android_studio.html

## Table of Contents

- [Introduction: the indexer’s role](#_introduction_the_indexers_role)
- [Introduction:_the_indexer’s_role](#_introduction_the_indexers_role)
- [Why indexing matters here](#_why_indexing_matters_here)
- [Why_indexing_matters_here](#_why_indexing_matters_here)
- [Setting up CLion](#_setting_up_clion)
- [Setting_up_CLion](#_setting_up_clion)
- [JetBrains AI Assistant + MCP](#_jetbrains_ai_assistant_mcp)
- [JetBrains_AI_Assistant_+_MCP](#_jetbrains_ai_assistant_mcp)
- [Junie](#_junie)
- [Bridging external agents through the JetBrains IDE MCP](#_bridging_external_agents_through_the_jetbrains_ide_mcp)
- [Bridging_external_agents_through_the_JetBrains_IDE_MCP](#_bridging_external_agents_through_the_jetbrains_ide_mcp)
- [Choosing between cloud and local models](#_choosing_between_cloud_and_local_models)
- [Choosing_between_cloud_and_local_models](#_choosing_between_cloud_and_local_models)
- [Before moving on](#_before_moving_on)
- [Before_moving_on](#_before_moving_on)
- [Android Studio specifics](#_android_studio_specifics)
- [Android_Studio_specifics](#_android_studio_specifics)
- [Tradeoffs](#_tradeoffs)
- [Summary](#_summary)

## Content

**CLion** and **Android Studio** build a full semantic model of your code, not just a text index — a complete Abstract Syntax Tree covering every macro expansion and every header pulled in from the Vulkan SDK. For AI tooling, that’s the most useful thing an IDE can provide, because it’s the difference between an assistant that pattern-matches on text and one that can check its answer against your actual code.

Most AI tools, left to their own devices, treat your code as text: they see `VkImageCreateInfo` and respond based on patterns learned during training, regardless of whether your engine’s version of that struct matches what’s in memory. If your engine wraps it differently, or you’re on an older SDK, a generic assistant will often suggest members or flags that don’t exist in your build.

Because CLion and Android Studio index the whole project, an assistant that queries that index can check where `VkImage` is actually defined, which extensions are enabled in your `CMakeLists.txt`, and whether you’re using the `vk::raii` wrappers before it answers. That doesn’t make it infallible, but it does mean a "refactor our image creation logic" request is checked against your code rather than guessed from a training-data average.

JetBrains AI Assistant supports the Model Context Protocol directly, which lets it call out to the Vulkan spec instead of relying only on what it saw during training.

**Adding the Vulkan MCP server:**

This assumes you’ve already built `mcp-Vulkan` as described in [the environment setup introduction](01_introduction.html#_first_step_building_the_vulkan_mcp_server).

Open **Settings** (`Ctrl+Alt+S` or `Cmd+,`).

Navigate to **Tools > AI Assistant > MCP Servers**.

Click **+** and select **Local Stdio**.

**Name:** `Vulkan-Spec`

**Command:** `node` (make sure Node.js is on your PATH).

**Arguments:** the absolute path to your built server: `/path/to/mcp-Vulkan/vulkan/build/index.js`.

**Environment Variables:** optional, only needed for other servers.

Once configured, the tools icon in the AI chat window shows the active MCP connection. Ask about a specific struct like `VkVideoProfileInfoKHR` and the assistant can pull the definition from the current registry rather than from stale training data.

**Example:** say you’re implementing dynamic rendering and aren’t sure whether `vkCmdBeginRendering` needs a specific extension enabled at instance creation. With the Vulkan Spec MCP connected, you can ask the assistant directly instead of checking the spec yourself — it queries the registry and your project’s `init.cpp` and gives you a yes/no answer grounded in both.

**Junie** is JetBrains' autonomous agent — it can act on your project rather than just suggesting snippets in a side panel.

By default, Junie uses **Gemini 3.1 Flash**, chosen for speed and a large context window that lets it read most of a project at once.

**Switching models for harder tasks:** Gemini 3.1 Flash is a reasonable default, but for something like designing a multi-threaded frame graph, switching to **Gemini 3.1 Pro**, **Claude 4.6**, or **GPT-5.3** in Junie’s settings will generally get better results at higher cost. You can switch from the dropdown in the Junie tool window or under `Settings > Tools > Junie`. Many developers leave Flash as the default for routine work (shader interfaces, unit tests) and switch to a stronger model only when Junie needs to reason through a genuinely hard bug or subsystem design.

Because Junie runs inside the IDE, it has direct access to the indexer, debugger, and build system. You can hand it something like "implement a `Buffer` class handling both staging and device-local memory using VMA," and it will create the header/source files, wire them into `CMakeLists.txt`, and attempt a build, fixing syntax errors it introduces along the way. It’s also more likely to reuse an existing `Device` wrapper than to instantiate a raw `VkDevice`, because it can see the wrapper in your code.

For a large, multi-file refactor, you may want an external agent like **Goose** to see the project the way CLion does. The **JetBrains IDE MCP** plugin exposes the IDE’s internal API for this. A request like "find every usage of `VkFramebuffer` and migrate it to the new `AttachmentBuilder` class" then goes through the actual indexer rather than a text search, which matters for catching usages buried in template code.

Not every task needs a large cloud model — writing a `VkImageView` creation loop doesn’t call for the same model as designing a synchronization-aware render graph.

JetBrains AI Assistant can connect to multiple backends, and many developers also use the **Continue** plugin to add others. A reasonable split: use a high-reasoning cloud model (**Claude 4.6**, **GPT-5.3**) for architectural work and complex C++ abstractions, and a local model (**Qwen 3-Coder 30B**, **Llama 4**) via **Ollama** for boilerplate, tests, and simple refactors. The local option is free, has no network latency, and keeps engine code on your machine — worth factoring in if that matters for your project.

Both can be reached from the same JetBrains AI task window, so switching between them is a matter of picking a different model, not a different tool.

The rest of this tutorial assumes at least two configured endpoints: a cloud model for architectural planning and complex debugging, and a local model for implementation. Once those are wired into your IDE (via AI Assistant, Junie, or Continue), continue to [Goose & Local Intelligence](05_goose_native_agent.html) to set up an autonomous agent and local inference.

Android Studio adds **Gemini**, tuned for the Android NDK and mobile GPU architectures (Adreno, Mali). Since Android Studio is built on the same platform as CLion, Junie and most of the CLion-specific tooling above work the same way here.

Android-specific extensions like `VK_ANDROID_external_memory_android_hardware_buffer` are a known rough edge in the API. Because Gemini in Android Studio has access to both your `AndroidManifest.xml` and your C++ source, a question like "how do I import an `AHardwareBuffer` into our Vulkan renderer?" gets checked against your actual manifest permissions and NDK version, with a plan that spans both the Java/Kotlin and JNI/Vulkan sides — rather than a generic snippet that may not match your target API level.

**Indexing cost.** JetBrains' depth of understanding isn’t free — initial indexing and the AI Assistant’s overhead can be noticeable on large engines, especially on machines without much RAM to spare. That cost is paid upfront; once indexed, lookups and refactors are faster and more accurate.

**Where it actually helps: semantic refactoring.** If you’re migrating a core abstraction (say, a custom `Buffer` class to a newer one), having the AST means the AI can rename, update signatures, and fix call sites project-wide more safely than a text-based tool would manage. This is the strongest argument for paying the indexing cost.

The main advantage of CLion and Android Studio for AI-assisted Vulkan work is that the AI can check its answers against what the compiler actually sees, rather than guessing from patterns. That narrows the context gap described in the previous chapter, at the cost of indexing overhead you’ll want to budget for on large projects.

Next: the [Goose native agent](05_goose_native_agent.html) chapter. If you’re on Windows, you may also want to check the [Visual Studio](03_visual_studio.html) chapter for comparison.

[Previous: Environment Introduction](01_introduction.html) | [Next: Goose Native Agent](05_goose_native_agent.html)
