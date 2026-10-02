# Anatomy of a Dependency: Introduction

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Synchronization/Anatomy_of_a_Dependency/01_introduction.html

## Table of Contents

- [Overview](#_overview)
- [What You’ll Learn in This Chapter](#_what_youll_learn_in_this_chapter)
- [What_You’ll_Learn_in_This_Chapter](#_what_youll_learn_in_this_chapter)
- [Navigation](#_navigation)

## Content

Every Vulkan operation, from a simple color clear to a complex ray-traced reflections pass, lives and breathes by the dependencies we define. In this chapter, we take a deep dive into the core mechanics of how data actually moves through the Vulkan pipeline and why synchronization is about much more than just "setting a bitmask."

![Flowchart showing the stages of a modern Vulkan rendering pipeline](../../_images/images/rendering_pipeline_flowchart.png)

To truly master synchronization, we first need to break down what happens when the GPU processes your commands. We often talk about the GPU as a "massive parallel processor," but what does that mean for data integrity? We’ll start by deconstructing the fundamental differences between **Execution Dependencies** (the "when" of GPU work) and **Memory Dependencies** (the "where" and "visibility" of data).

This chapter is designed to move you from "making it work" to "knowing why it works." We’ll explore:

* 
**The Hardware Perspective**: Understanding why execution barriers alone are not enough to prevent data corruption on modern, multi-cache GPUs.

* 
**Execution vs. Memory Dependencies**: Learning how to distinguish between stopping a stage and ensuring its data is actually readable by the next one.

* 
**The Synchronization 2 Advantage**: Why the new `vk::DependencyInfo` and `vk::CmdPipelineBarrier2` are more than just a syntax cleanup—they are a fundamental shift in how we express intent to the driver.

* 
**Surgical Precision with Pipeline Stages**: Mastering `vk::PipelineStageFlagBits2` and `vk::AccessFlagBits2` to target specific hardware units, ensuring maximum GPU occupancy by avoiding unnecessary pipeline bubbles.

By the end of this chapter, you’ll have a clear understanding of the "handshake" that must occur between any two pieces of GPU work. This foundation is crucial for everything that follows, from simple image layout transitions to complex asynchronous compute architectures.

Previous: [Introduction](../introduction.html) | Next: [Execution vs. Memory Dependencies](02_execution_vs_memory.html)
