# VK_EXT_swapchain_maintenance1

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_swapchain_maintenance1.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [1.1. Recycling Present Semaphores](#_recycling_present_semaphores)
- [1.1._Recycling_Present_Semaphores](#_recycling_present_semaphores)
- [1.2. Swapchain Recreation on Present Mode Change](#_swapchain_recreation_on_present_mode_change)
- [1.2._Swapchain_Recreation_on_Present_Mode_Change](#_swapchain_recreation_on_present_mode_change)
- [1.3. Upfront Memory Allocation](#_upfront_memory_allocation)
- [1.3._Upfront_Memory_Allocation](#_upfront_memory_allocation)
- [1.4. Scaling Behavior](#_scaling_behavior)
- [1.4._Scaling_Behavior](#_scaling_behavior)
- [1.5. Releasing Acquired Images](#_releasing_acquired_images)
- [1.5._Releasing_Acquired_Images](#_releasing_acquired_images)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [2.1. Recycling Present Semaphores](#_recycling_present_semaphores_2)
- [2.1._Recycling_Present_Semaphores](#_recycling_present_semaphores_2)
- [2.2. Swapchain Recreation on Present Mode Change](#_swapchain_recreation_on_present_mode_change_2)
- [2.2._Swapchain_Recreation_on_Present_Mode_Change](#_swapchain_recreation_on_present_mode_change_2)
- [2.3. Upfront Memory Allocation](#_upfront_memory_allocation_2)
- [2.3._Upfront_Memory_Allocation](#_upfront_memory_allocation_2)
- [2.4. Scaling Behavior](#_scaling_behavior_2)
- [2.4._Scaling_Behavior](#_scaling_behavior_2)
- [2.5. Releasing Acquired Images](#_releasing_acquired_images_2)
- [2.5._Releasing_Acquired_Images](#_releasing_acquired_images_2)
- [3. Proposal](#_proposal)
- [3.1. Feature](#_feature)
- [3.2. Present Fence](#_present_fence)
- [3.2._Present_Fence](#_present_fence)
- [3.3. Switching Present Modes](#_switching_present_modes)
- [3.3._Switching_Present_Modes](#_switching_present_modes)
- [3.4. Swapchain Memory Allocation](#_swapchain_memory_allocation)
- [3.4._Swapchain_Memory_Allocation](#_swapchain_memory_allocation)
- [3.5. Scaling Behavior](#_scaling_behavior_3)
- [3.5._Scaling_Behavior](#_scaling_behavior_3)
- [3.6. Releasing Acquired Images](#_releasing_acquired_images_3)
- [3.6._Releasing_Acquired_Images](#_releasing_acquired_images_3)
- [4. Issues](#_issues)
- [4.1. Should there be a surface capability bit to advertise the present fence functionality?](#_should_there_be_a_surface_capability_bit_to_advertise_the_present_fence_functionality)
- [4.1._Should_there_be_a_surface_capability_bit_to_advertise_the_present_fence_functionality?](#_should_there_be_a_surface_capability_bit_to_advertise_the_present_fence_functionality)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)

[1.1. Recycling Present Semaphores](#_recycling_present_semaphores)
[1.2. Swapchain Recreation on Present Mode Change](#_swapchain_recreation_on_present_mode_change)
[1.3. Upfront Memory Allocation](#_upfront_memory_allocation)
[1.4. Scaling Behavior](#_scaling_behavior)
[1.5. Releasing Acquired Images](#_releasing_acquired_images)

[2. Solution Space](#_solution_space)

[2.1. Recycling Present Semaphores](#_recycling_present_semaphores_2)
[2.2. Swapchain Recreation on Present Mode Change](#_swapchain_recreation_on_present_mode_change_2)
[2.3. Upfront Memory Allocation](#_upfront_memory_allocation_2)
[2.4. Scaling Behavior](#_scaling_behavior_2)
[2.5. Releasing Acquired Images](#_releasing_acquired_images_2)

[3. Proposal](#_proposal)

[3.1. Feature](#_feature)
[3.2. Present Fence](#_present_fence)
[3.3. Switching Present Modes](#_switching_present_modes)
[3.4. Swapchain Memory Allocation](#_swapchain_memory_allocation)
[3.5. Scaling Behavior](#_scaling_behavior_3)
[3.6. Releasing Acquired Images](#_releasing_acquired_images_3)

[4. Issues](#_issues)

[4.1. Should there be a surface capability bit to advertise the present fence functionality?](#_should_there_be_a_surface_capability_bit_to_advertise_the_present_fence_functionality)

This proposal investigates and addresses a number of practical issues with the
`VK_KHR_swapchain` specification.

The following is a list of issues considered in this proposal:

* 
It is not directly known when a semaphore used for presentation can be
recycled.

* 
Switching present modes requires a swapchain recreation

* 
Upfront memory allocation is costly in startup time and memory

* 
Unknown behavior when presenting a swapchain image to a surface with
different dimensions

* 
Impossible to release acquired images without presenting them

With `VK_KHR_swapchain`, there is no way to provide feedback as to when a
semaphore used for presentation can be freed or recycled.
The application would have to infer this information from when the fence of the
*next* call to `vkAcquireNextImageKHR` that returns the presented image’s index
has been signaled.
This is needlessly complicated.

Currently, when changing present modes, the Vulkan swapchain is required to be
recreated.
This is unnecessary if otherwise the swapchain is not changed, as the present
mode does not affect the actual swapchain images and their associated memory.
This is realistically affecting apps that switch between
VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR and
VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR (in single-buffer applications).
In that case, a flicker is noticed as the swapchain is recreated and the old
contents of the swapchain is discarded.

Currently, Vulkan allows the application to record commands using any image
from the swapchain.
Additionally, the application may use `VkBindImageMemorySwapchainInfoKHR` at
any time to bind an image to swapchain memory.
This requires swapchain implementations to allocate memory for all images
upfront.
This is costly both in startup time, and potentially memory if all images are
not eventually acquired.

It is desirable for the application to specify a scaling behavior for when the
swapchain extents do not match the surface’s, such as during window resizing,
instead of receiving `VK_ERROR_OUT_OF_DATE_KHR`.

See the proposal document for `VK_EXT_surface_maintenance1` for details.

When the swapchain needs to be recreated, it may be possible that an
application has acquired images from the old swapchain that it is no longer
interested in presenting to.
However, it is unable to release those images before recreating the swapchain.
As a result, the application is forced to present to an old swapchain that may
no longer match the surface.
Additionally, the memory allocated for the old and new swapchains coexist,
increasing peak memory usage.

There are generally two possible approaches to resolving these problems:

* 
Have the application directly interface with the window system, bypassing
`VK_KHR_swapchain`.

* 
Improve upon `VK_KHR_swapchain`

The benefits of the first approach are:

* 
Total control of the swapchain implementation by the application, which
would allow for prompt fixes of future issue

* 
Works on existing drivers, removing any need for fallbacks

However, this approach results in duplicated effort among applications.
A potential library with a swapchain implementation can be conceived which
could be updated and shipped with applications independently from driver
updates, though it lacks the benefit of driver updates bringing fixes and
optimizations to all applications.

This proposal considers the second approach with the goal of improving the
larger Vulkan ecosystem while leveraging existing swapchain implementations
which most applications have come to rely on.

There are three potential solutions for this:

* 
A status query for present operations, potentially identified through ids
assigned with `VK_KHR_present_id`.

* 
A wait function similar to `vkWaitForPresentKHR`

* 
A fence passed to `vkQueuePresentKHR` that signals when the presentation
engine no longer accesses the present semaphores

The last solution is adopted as it provides more power to the application
(wait, in addition to query), as well as fitting better with event loops, other
Vulkan APIs and future work to enable timeline semaphores.

Each present mode may require a different number of images.
Additionally, the `VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR` and
`VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR` present modes may require a
different image memory layout compared with the rest of the present modes.
Switching between non-shared present modes may or may not be possible on some
implementations.

Regarding image count, potential solutions are:

* 
Specify all potential present modes at swapchain creation time

The swapchain would then allocate as many images to satisfy all present
modes

Increase the number of swapchain images as necessary when present mode is
changed

* 
This requires the application to use `vkGetSwapchainImagesKHR` after each
change in present mode and adjust accordingly

Regarding the subsets of switchable present modes that the implementation
supports, potential solutions are:

* 
Specify a particular behavior for `VkSwapchainCreateInfoKHR::oldSwapchain`
when the only change is in the present mode

This is not straightforward and is error-prone

Allow modifying present modes as needed, such as during a
`vkQueuePresentKHR` call

* 
Implementations may support switching between present modes only in
disjoint subsets.
This subsets can be queried.
Alternatively, Vulkan could divide the present modes into shared and
non-shared, with the latter conditional to a feature flag.

The adopted solution in this proposal is to allow applications to specify a
potential set of present modes at swapchain creation time.
A query must be used to determine whether these present modes are compatible
for dynamic switching.
Then, the application would pass the desired present mode to
`vkQueuePresentKHR`.

With the solution to the "Upfront Memory Allocation" problem, the application
can avoid paying any extra memory cost due to higher image counts until a
present mode that uses that many images is used.

This can be explicitly opted in with a new swapchain create flag.
Using this flag would prohibit problematic scenarios, such as using
`VkBindImageMemorySwapchainInfoKHR` with an image index that has never been
acquired, or recording command buffers using those swapchain images.

This amortizes the cost of memory allocation between the first few frames,
using CPU time that may otherwise have gone idle waiting for the GPU.
This will additionally resolve a number of memory issues:

* 
If a present mode is specified at swapchain creation time which requires a
larger number of images, but that is never actually used, the extra
images would not have to consume memory.

* 
When resizing the swapchain, peak memory increase is avoided by not
actually allocating memory for the new swapchain.
First memory allocation for the new swapchain could happen after some of
the images from the old swapchain have been destroyed.

The `VK_EXT_surface_maintenance1` extension introduces scaling and gravity
behavior enums whose support can be queried from the surface.
At swapchain creation time, one of the supported behavior can be specified by
the application.

There are a number of ways the applications could partially work around this
issue, such as by deferring image acquisition, or recreating the swapchain only
once all images from the old swapchain are presented.

However, in all implementations, releasing an acquired image without presenting
it is no more complex than presenting it.
The adopted solution is to expose this functionality in this extension.

Introduced by this API are:

Advertising whether the implementation supports the functionality in this
extension:

typedef struct VkPhysicalDeviceSwapchainMaintenance1FeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           swapchainMaintenance1;
} VkPhysicalDeviceSwapchainMaintenance1FeaturesEXT;

To associate fences with the present operations for each swapchain, chain the
following to `VkPresentInfoKHR`:

typedef struct VkSwapchainPresentFenceInfoEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           swapchainCount;
    VkFence*           pFences;
} VkSwapchainPresentFenceInfoEXT;

With `swapchainCount` matching
`VkSwapchainPresentFenceInfoEXT::swapchainCount`, each swapchain being
presented to will signal the fence once the application is allowed to destroy
or recycle the semaphores passed to `vkPresentInfoKHR::pWaitSemaphores`.

During creation of the swapchain, all potential present modes are specified by
chaining the following to `VkSwapchainCreateInfoKHR`:

typedef struct VkSwapchainPresentModesCreateInfoEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           presentModeCount;
    VkPresentModeKHR*  pPresentModes;
} VkSwapchainPresentModesCreateInfoEXT;

The present modes given in `pPresentModes` must be compatible for mode
switching.
This can be queried by use of `VkSurfacePresentModeCompatibilityEXT` from the
`VK_EXT_surface_maintenance1` extension.

The present mode can be changed by chaining the following to
`VkPresentInfoKHR`:

typedef struct VkSwapchainPresentModeInfoEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           swapchainCount;
    VkPresentModeKHR*  pPresentModes;
} VkSwapchainPresentModeInfoEXT;

Where the elements of `pPresentModes` can take any present mode specified in
`VkSwapchainPresentModesCreateInfoEXT` during the creation of the respective
swapchain.
If not specified, the swapchain will continue to operate according to the last
specified present mode.

To allow the swapchain to defer memory allocation for each image until it is
acquired through `vkAcquireNextImageKHR`, specify the
`VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_EXT` flag in
`VkSwapchainCreateInfoKHR::flags`.
In that case, the application may still use `vkGetSwapchainImagesKHR` to
retrieve the image handles, but it may not use any image whose index has never
been returned by `vkAcquireNextImageKHR`; this includes recording commands
using such an image, or binding another image to its memory through
`VkBindImageMemorySwapchainInfoKHR`.

As memory allocation for each image is deferred, so should the application
defer the above operations for each image until it is first acquired.

To specify the scaling behavior of the swapchain, chain the following to
`VkSwapchainCreateInfoKHR`:

typedef struct VkSwapchainPresentScalingCreateInfoEXT {
    VkStructureType                 sType;
    void*                           pNext;
    VkPresentScalingFlagsEXT        scalingBehavior;
    VkPresentGravityFlagsEXT        presentGravityX;
    VkPresentGravityFlagsEXT        presentGravityY;
} VkSwapchainPresentScalingCreateInfoEXT;

The values specified in `scalingBehavior`, `presentGravityX` and
`presentGravityY` must be supported by the surface.
This can be queried by use of `VkSurfacePresentScalingCapabilitiesEXT` from the
`VK_EXT_surface_maintenance1` extension.

To release previously acquired images back to the swapchain, call
`vkReleaseSwapchainImagesEXT`:

VKAPI_ATTR VkResult VKAPI_CALL vkReleaseSwapchainImagesEXT(
    VkDevice                                    device,
    const VkReleaseSwapchainImagesInfoEXT*      pReleaseInfo);

`VkReleaseSwapchainImagesInfoEXT` is defined as:

typedef struct VkReleaseSwapchainImagesInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkSwapchainKHR     swapchain;
    deUint32           imageIndexCount;
    const deUint32*    pImageIndices;
} VkReleaseSwapchainImagesInfoEXT;

No.
Present fences fix a critical hole in the swapchain programming model and hence
are a required feature of this maintenance extension.
