# VK_EXT_external_memory_acquire_unmodified

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_external_memory_acquire_unmodified.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [2.1. Design Goals](#_design_goals)
- [2.1._Design_Goals](#_design_goals)
- [2.2. Considered Solutions](#_considered_solutions)
- [2.2._Considered_Solutions](#_considered_solutions)
- [2.3. Solution Analysis](#_solution_analysis)
- [2.3._Solution_Analysis](#_solution_analysis)
- [3. Proposal](#_proposal)
- [3.1. Feature](#_feature)
- [3.2. Caution](#_caution)
- [4. Issues](#_issues)
- [4.1. OUT OF SCOPE. How to determine if a resource’s external memory is modified?](#_out_of_scope_how_to_determine_if_a_resources_external_memory_is_modified)
- [4.1._OUT_OF_SCOPE._How_to_determine_if_a_resource’s_external_memory_is_modified?](#_out_of_scope_how_to_determine_if_a_resources_external_memory_is_modified)
- [5. Further Functionality](#_further_functionality)
- [5._Further_Functionality](#_further_functionality)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)

[2.1. Design Goals](#_design_goals)
[2.2. Considered Solutions](#_considered_solutions)
[2.3. Solution Analysis](#_solution_analysis)

[3. Proposal](#_proposal)

[3.1. Feature](#_feature)
[3.2. Caution](#_caution)

[4. Issues](#_issues)

[4.1. OUT OF SCOPE. How to determine if a resource’s external memory is modified?](#_out_of_scope_how_to_determine_if_a_resources_external_memory_is_modified)

[5. Further Functionality](#_further_functionality)

This document proposes adding a performance hint that may reduce the runtime
cost of memory barriers that acquire ownership of a resource from an external
queue family (such as
[VK_QUEUE_FAMILY_FOREIGN_EXT](https://docs.vulkan.org/spec/latest/chapters/synchronization.html#VK_QUEUE_FAMILY_FOREIGN_EXT)).

A memory barrier that acquires ownership of a resource from an external queue
family may, in some cases, have an unacceptable runtime cost and produce
noticeable latency.

An external resource’s data may be split between external memory and
non-external memory.
The resource’s *external memory* is the collection of ranges
of [VkDeviceMemory](https://docs.vulkan.org/spec/latest/chapters/memory.html#VkDeviceMemory) bound to the resource,
where the [VkDeviceMemory](https://docs.vulkan.org/spec/latest/chapters/memory.html#VkDeviceMemory) has been imported or
exported with an API related to
[VK_KHR_external_memory](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_external_memory).
The external memory is shared among all external APIs and/or processes that
access the resource.
The resource’s *non-external memory*, in this discussion,
is any implementation-private memory that
is associated with the resource
and does not reside in any range of [VkDeviceMemory](https://docs.vulkan.org/spec/latest/chapters/memory.html#VkDeviceMemory) bound to the resource.
For example, if the external resource is a [VkImage](https://docs.vulkan.org/spec/latest/chapters/resources.html#VkImage),
then in some Vulkan implementations
the external memory may contain the image’s pixel data and externally shared metadata,
and the non-external memory may contain implementation-private metadata.
Note that, in some Vulkan implementations,
the resource’s non-external memory, unlike its external memory, is
not shared globally among the APIs and/or processes that use the resource.
For example, each [VkDevice](https://docs.vulkan.org/spec/latest/chapters/devsandqueues.html#VkDevice)
and `EGLContext` that accesses the resource may maintain its own private
non-external memory for the resource.

For this discussion, a resource’s *external memory* is considered
*unmodified* if no bit was modified in the allocated memory.
This definition refers only to the physical bits in the allocated memory, and
is independent of Vulkan operations such as image layout transitions, shader
access, transfer commands, etc.
In particular, operations that seem to be read-only may modify a resource’s
memory in some cases.
This definition is also independent of the resource’s *non-external memory*;
that is, it is independent of any modifications to implementation-private memory
associated with the resource.

The performance problem is due to the Vulkan implementation’s need to maintain
synchronization between data contained in the resource’s external memory
and in its non-external memory.
When an application releases ownership of a resource to an external queue
family and later re-acquires ownership, the external queue family may have
modified the resource’s external memory during its ownership.
If the external queue family *did* modify the resource’s external memory,
then, when the application re-acquires ownership, the Vulkan implementation
must, during the ownership-acquire operation, synchronize the resource’s non-external
data with the new, modified external data.
In this case, the synchronization operation is unavoidable.
However, if the external queue family *did not* modify the resource’s external
memory, and if the implementation is *unable to determine* that the external
memory remained unmodified, then the Vulkan implementation must *still*
synchronize the data during the acquire operation.
In this case, the synchronization operation is unnecessary.
If the application had the ability to inform that Vulkan implementation that
resource’s external memory remained unmodified, then the implementation could
avoid the synchronization operation.

For example, suppose the application renders to an image, then transfers
ownership of the image to
[VK_QUEUE_FAMILY_FOREIGN_EXT](https://docs.vulkan.org/spec/latest/chapters/synchronization.html#VK_QUEUE_FAMILY_FOREIGN_EXT),
then later re-acquires the image with
[VkImageMemoryBarrier](https://docs.vulkan.org/spec/latest/chapters/synchronization.html#VkImageMemoryBarrier).
Suppose the application knows that the external queue family did not modify
the image’s external memory, but cannot inform the Vulkan implementation
of its unmodified status due to lack of Vulkan API.
The Vulkan implementation must perform the unnecessary data synchronization
during the execution of the [VkImageMemoryBarrier](https://docs.vulkan.org/spec/latest/chapters/synchronization.html#VkImageMemoryBarrier).

The problem is especially relevant for systems that implement
[VkSwapchainKHR](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#VkSwapchainKHR)
by layering it atop the external memory extensions such as
[VK_EXT_external_memory_dma_buf](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_external_memory_dma_buf).
On such systems, the application may suffer the performance overhead each time
it acquires an image from the swapchain, even though the window system did not
modify the image’s memory.
Specifically, the overhead is likely to occur when the application transitions
the image layout away from
[VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](https://docs.vulkan.org/spec/latest/chapters/resources.html#VkImageLayout)
after [vkAcquireNextImageKHR](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#vkAcquireNextImageKHR).

* 
The solution must provide the application a way to inform the implementation
that the external resource has remained unmodified for the duration from the
application’s most recent release of ownership to the external queue family
until the application’s current ownership acquire operation.

* 
The solution should not require the implementation to internally track the
[VkImageLayout](https://docs.vulkan.org/spec/latest/chapters/resources.html#VkImageLayout) of external images.
Such tracking can be complex to implement and cause performance overhead.

* 
The solution must work well for systems that implement
[VkSwapchainKHR](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#VkSwapchainKHR) by layering it atop external
memory extensions such as
[VK_EXT_external_memory_dma_buf](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_external_memory_dma_buf).

* 
After acquiring a swapchain image but before using the image, applications
must transition the image away from
[VK_IMAGE_LAYOUT_PRESENT_SRC_LAYOUT_KHR](https://docs.vulkan.org/spec/latest/chapters/resources.html#VkImageLayout)
(which preserves the image’s pixels) or [VK_IMAGE_LAYOUT_UNDEFINED](https://docs.vulkan.org/spec/latest/chapters/resources.html#VkImageLayout)
(which discards the image’s pixels). The solution should work well and
improve performance regardless of the source layout.

* 
**A**. Define a new read-only external queue family, such as `VK_QUEUE_FAMILY_FOREIGN_READ_ONLY_EXT`.
When the application transfers ownership of a resource to this queue family,
it implicitly informs the implementation that the external queue will not
modify the resource’s external memory.

* 
**B**. Extend resource creation, such as [VkImageCreateInfo](https://docs.vulkan.org/spec/latest/chapters/resources.html#VkImageCreateInfo),
with a new parameter that informs the implementation that no external queue
will modify the resource’s external memory.

* 
**C**. Extend the ownership-release memory barrier, such as
[VkImageMemoryBarrier](https://docs.vulkan.org/spec/latest/chapters/synchronization.html#VkImageMemoryBarrier), with a new
parameter that informs the implementation that the resource’s external memory
will remain unmodified for the duration of the external queue family’s
ownership.

* 
**D**. Extend the ownership-acquire memory barrier, such as
[VkImageMemoryBarrier](https://docs.vulkan.org/spec/latest/chapters/synchronization.html#VkImageMemoryBarrier), with a new
parameter that informs the implementation that the resource’s external memory
has remained unmodified since the most recent ownership-release.

For analyzing the pros and cons of each solution, let us examine the life of
an external image that involves the following producers/consumers.

* 
A Vulkan application. It juggles the external image among the following
producers/consumers in addition to its own independent Vulkan rendering.

* 
A video decoder.

* 
A library that post-processes the image with Vulkan.
For example, the library may apply color correction or add dropshadows.
When the image is submitted to the library for post-processing, sometimes the
library applies changes to the image, sometimes the library returns the image
unchanged.

* 
A presentation engine (such as a window system) that only reads the image
and never modifies it.
The application does not use Vulkan WSI to interact with the presentation
engine, such as [vkCreateWaylandSurfaceKHR](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#vkCreateWaylandSurfaceKHR),
[VkSwapchainKHR](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#VkSwapchainKHR), and
[vkQueuePresentKHR](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#vkQueuePresentKHR).
Instead, the application effectively implements these
functions itself with a combination of
[VK_EXT_external_memory_dma_buf](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_external_memory_dma_buf),
[VK_EXT_queue_family_foreign](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_queue_family_foreign),
and  native Wayland API from `libwayland-client`.

The image is used in the following loop:

* 
**a**. Application’s Vulkan releases ownership of the image to the video decoder.

* 
**b**. Video decoder writes to the image, discarding all previous pixel data.

* 
**c**. Application’s Vulkan acquires ownership.

* 
**d**. Application’s Vulkan adds a visual effect to the image.

* 
**e**. Application’s Vulkan releases ownership to the post-processing library.

* 
**f**. Post-processing library works on the image. This step has two subcases:

* 
**f.rw**. Post-processing library modifies the image.

* 
**f.ro**. Post-processing library does not modify the image.

* 
**g**. Application’s Vulkan acquires ownership.

* 
**h**. Application’s Vulkan samples the image during full-scene composition.

* 
**i**. Application’s Vulkan releases ownership to the presentation engine.

* 
**j**. Application’s Vulkan acquires ownership.

* 
**k**. Loop. This step has two subcases:

* 
**k.a**. The video decoder is ready to provide a new frame. Goto (a).

* 
**k.d**. The video decoder is not yet ready. Goto (d).

Solution (B) is unusable in this workflow.

Solution (A) works well for steps (i, j, k) because the presentation engine is
read-only.
However, the solution is unusable at step (e) because the application does not
know yet whether step (f.rw) or (f.ro) will be taken.

Solution (`C`) is equivalent to (A) in this example scenario.

Solution (D) works well for all steps in the sequence. In particular, between
(f) and (g), the application can query the post-processing library, asking
whether (f.rw) or (f.ro) occurred. If (f.ro), the application can add the
performance hint to [VkImageMemoryBarrier](https://docs.vulkan.org/spec/latest/chapters/synchronization.html#VkImageMemoryBarrier) in step (g).

We propose API for solution (D).

// Extends `VkImageMemoryBarrier*` and `VkBufferMemoryBarrier*`.
typedef struct VkExternalMemoryAcquireUnmodifiedEXT {
    VkStructureType sType;
    const void* pNext;
    VkBool32 acquireUnmodifiedMemory;
} VkExternalMemoryAcquireUnmodifiedEXT;

When the application releases ownership of an external resource to an
external queue family and later re-acquires ownership, and the application
knows that resource’s external memory remained unmodified between the release
and acquire, then the application should chain
`VkExternalMemoryAcquireUnmodifiedEXT` into the acquire-operation’s memory
barrier and set `acquireUnmodifiedMemory = VK_TRUE`.

If `acquireUnmodifiedMemory` is `VK_FALSE`, then the Vulkan implementation
ignores the struct.
In particular, the struct in this case *does not* specify that the resource’s
external memory is modified, but rather that it is unknown whether it is
modified or not.

To allow flexibility in applications and layers, we propose allowing this
struct to be chained into any memory barrier for any resource.
If the memory barrier’s `srcQueueFamilyIndex` does not specify an external
queue family, then the Vulkan implementation ignores the struct.
This flexibility simplifies the implementation of layers that implement
[VkSwapchainKHR](https://docs.vulkan.org/spec/latest/chapters/VK_KHR_surface/wsi.html#VkSwapchainKHR) atop
[VK_KHR_external_memory](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_external_memory) and native
window system APIs.

Applications and libraries should not use "common sense" approaches to
determine whether an API has modified the resource.
They should make the determination solely with dedicated query APIs or with
specialist knowledge of the API’s implementation.

*A counter-example for a "common sense" approach.*
Operations that appear to be read-only may be implemented as read-write.
Suppose the post-processing library discussed above wants to provide API that
allows the application to query, between steps (f) and (g), whether the library
has modified the image.
A deceptively straightforward, but incorrect, method of implementing the query
is to track all Vulkan API and SPIR-V instructions that accesses the image.
The query will report "unmodified" if and only if the library accessed the
image only with "read-only" Vulkan API and SPIR-V instructions.
In this method, examples of "read-only" access are SPIR-V instructions such as
[OpImageRead](https://www.khronos.org/registry/SPIR-V/specs/unified1/SPIRV.html#OpImageRead),
[OpImageFetch](https://www.khronos.org/registry/SPIR-V/specs/unified1/SPIRV.html#OpImageFetch),
and [OpImageSampleImplicitLod](https://www.khronos.org/registry/SPIR-V/specs/unified1/SPIRV.html#OpImageSampleImplicitLod),
and transfer commands such as [vkCmdCopyImage](https://docs.vulkan.org/spec/latest/chapters/copies.html#vkCmdCopyImage).
Surprisingly, these operations may not be implemented as read-only.
The Vulkan implementation, before dispatching the "read-only" shader
or transfer command, may modify the image’s external memory
in order to improve the performance of the image reads,
or in order to coerce the image to use a memory layout
that is compatible with fickle hardware requirements.

This proposal does not provide a way for the application to query whether the
resource’s external memory was modified by an external queue family,
which is unfortunately necessary for the application to determine whether to set
`VkExternalMemoryAcquireUnmodifiedEXT::acquireUnmodifiedMemory`.

When the external queue family accesses the resource with non-Vulkan APIs, then
such queries are clearly outside the scope of Vulkan.
Each API that accesses the resource should provide its own query API.
It is a contradiction to define Vulkan API for this query because,
if Vulkan were able to determine whether a non-Vulkan API modified the
resource’s external memory,
then this extension would be unnecessary (see the problem statement).

However, when the external queue family accesses the image with Vulkan
then the query API should reasonably belong in Vulkan itself.
For example, in the post-processing library discussed above,
the library cannot provide a query API to the application
unless Vulkan itself provides a query API to the library.
In this proposal’s design discussions,
we agreed that designing such a query API is
significantly more complex than designing this proposal’s hint API.
Because this proposal’s feature is immediately useful
despite Vulkan lacking the query API, we agreed to postpone the design of the
query.

The natural complement to this proposal’s feature
is a feature that would provide the application a way to query
whether Vulkan itself has modified a resource’s external memory.
This feature is deferred to a future extension, as explained in the Issues
section.
