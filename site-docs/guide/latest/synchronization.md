# Synchronization

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/synchronization.html

## Table of Contents

- [Validation](#_validation)
- [Pipeline Barriers](#_pipeline_barriers)
- [VK_KHR_synchronization2](#_vk_khr_synchronization2)

## Content

Synchronization is one of the most powerful but also most complex parts of using Vulkan. The application developer is now responsible for managing synchronization using the various [Vulkan synchronization primitives](https://docs.vulkan.org/spec/latest/chapters/synchronization.html#synchronization-pipeline-barriers). Improper use of synchronization can lead to hard-to-find bugs as well as poor performance in cases where the the GPU is unnecessarily idle.

There are a [set of examples](https://github.com/KhronosGroup/Vulkan-Docs/wiki/Synchronization-Examples) and a [Understanding Vulkan Synchronization](https://www.khronos.org/blog/understanding-vulkan-synchronization) blog provided by Khronos on how to use some of the synchronization primitives. There are also presentations from Tobias Hector from past Vulkan talks: [part 1 slides](https://www.khronos.org/assets/uploads/developers/library/2017-vulkan-devu-vancouver/009%20-%20Synchronization%20-%20Keeping%20Your%20Device%20Fed.pdf) ([video](https://www.youtube.com/watch?v=YkJ4hKCPjm0)) and [part 2 slides](https://www.khronos.org/assets/uploads/developers/library/2018-vulkanised/06-Keeping%20Your%20Device%20Fed%20v4_Vulkanised2018.pdf) ([video](https://www.youtube.com/watch?v=5GDg4OxkSEc)).

The following is an overview diagram of the difference between `VkEvent`, `VkFence`, and `VkSemaphore`

![synchronization_overview.png](_images/synchronization_overview.png)

The Khronos Validation Layer has implemented some [validation for synchronization](https://vulkan.lunarg.com/doc/sdk/latest/windows/synchronization_usage.html). It can easily be enabled by the [Vulkan Configurator](https://vulkan.lunarg.com/doc/sdk/latest/windows/vkconfig.html) included with the [Vulkan SDK](https://vulkan.lunarg.com/sdk/home). A [detailed whitepaper](https://www.lunarg.com/wp-content/uploads/2020/09/Final_LunarG_Guide_to_Vulkan-Synchronization_Validation_08_20.pdf) discussing the synchronization validation has been written as well and released as a [Khronos Blog](https://www.khronos.org/blog/a-guide-to-vulkan-synchronization-validation).

[Pipeline Barriers](https://docs.vulkan.org/spec/latest/chapters/synchronization.html#synchronization-pipeline-barriers) give control over which pipeline stages need to wait on previous pipeline stages when a command buffer is executed.

![synchronization_pipeline_barrieres.png](_images/synchronization_pipeline_barrieres.png)

While Pipeline Barriers might be hard to understand at first, there are many great Khronos talks and other resources that go more in depth on the topic.

* 
[Vulkanised 2018 - Low-level mysteries of pipeline barriers](https://www.khronos.org/assets/uploads/developers/library/2018-vulkanised/05-The%20low-level%20mysteries%20of%20pipeline%20barriers_Vulkanised2018.pdf) ([video](https://www.youtube.com/watch?v=e0ySJ9Qzvrs))

* 
[Vulkanised 2019 - Live Long and Optimise](https://www.khronos.org/assets/uploads/developers/library/2019-vulkanised/02_Live%20Long%20And%20Optimise-May19.pdf)  ([video](https://www.youtube.com/watch?v=ch6161wvME8&t=463s)) Pipeline Analysis starting slide 12

* 
[Vulkan barriers explained](https://gpuopen.com/learn/vulkan-barriers-explained/) blog post

* 
[Yet another blog post explaining Vulkan synchronization](http://themaister.net/blog/2019/08/14/yet-another-blog-explaining-vulkan-synchronization/)

The `VK_KHR_synchronization2` extension overhauls the original core synchronization APIs to reduce complexity for application developers, as well as adding a few additional features not present in the original APIs.

Read the [VK_KHR_synchronization2](extensions/VK_KHR_synchronization2.html#VK_KHR_synchronization2) chapter for more info about the difference in the synchronization APIs and how to port over to using the new extension
