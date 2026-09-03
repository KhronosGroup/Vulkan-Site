# Protected Memory

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/protected.html

## Table of Contents

- [Checking for support](#_checking_for_support)
- [Checking_for_support](#_checking_for_support)
- [Protected queues](#_protected_queues)
- [Protected resources](#_protected_resources)
- [Protected swapchain](#_protected_swapchain)
- [Protected command buffer](#_protected_command_buffer)
- [Protected_command_buffer](#_protected_command_buffer)
- [Submitting protected work](#_submitting_protected_work)
- [Submitting_protected_work](#_submitting_protected_work)

## Content

Protected memory divides device memory into “protected device memory” and “unprotected device memory”.

In general, most OS don’t allow one application to access another application’s GPU memory unless explicitly shared (e.g. via [external memory](extensions/external.html#external-memory)). A common example of protected memory is for containing DRM content, which a process might be allowed to modify (e.g. for image filtering, or compositing playback controls and closed captions) but shouldn' be able to extract into unprotected memory. The data comes in encrypted and remains encrypted until it reaches the pixels on the display.

The Vulkan Spec [explains in detail](https://docs.vulkan.org/spec/latest/chapters/memory.html#memory-protected-memory) what “protected device memory” enforces. The following is a breakdown of what is required in order to properly enable a protected submission using protected memory.

Protected memory was added in Vulkan 1.1 and there was no extension prior. This means any Vulkan 1.0 device will not be capable of supporting protected memory. To check for support, an application must [query and enable](enabling_features.html#enabling-features) the `VkPhysicalDeviceProtectedMemoryFeatures::protectedMemory` field.

A protected queue can read both protected and unprotected memory, but can only write to protected memory. If a queue can write to unprotected memory, then it can’t also read from protected memory.

|  | Often performance counters and other timing measurement systems are disabled or less accurate for protected queues to prevent side-channel attacks. |
| --- | --- |

Using `vkGetPhysicalDeviceQueueFamilyProperties` to get the `VkQueueFlags` of each queue, an application can find a queue family with `VK_QUEUE_PROTECTED_BIT` flag exposed. This does **not** mean the queues from the family are always protected, but rather the queues **can be** a protected queue.

To tell the driver to make the `VkQueue` protected, the `VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT` is needed in `VkDeviceQueueCreateInfo` during `vkCreateDevice`.

The following pseudo code is how an application could request for 2 protected `VkQueue` objects to be created from the same queue family:

VkDeviceQueueCreateInfo queueCreateInfo[1];
queueCreateInfo[0].flags             = VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT;
queueCreateInfo[0].queueFamilyIndex  = queueFamilyFound;
queueCreateInfo[0].queueCount        = 2; // assuming 2 queues are in the queue family

VkDeviceCreateInfo deviceCreateInfo   = {};
deviceCreateInfo.pQueueCreateInfos    = queueCreateInfo;
deviceCreateInfo.queueCreateInfoCount = 1;
vkCreateDevice(physicalDevice, &deviceCreateInfo, nullptr, &deviceHandle);

It is also possible to split the queues in a queue family so some are protected and some are not. The following pseudo code is how an application could request for 1 protected `VkQueue` and 1 unprotected `VkQueue` objects to be created from the same queue family:

VkDeviceQueueCreateInfo queueCreateInfo[2];
queueCreateInfo[0].flags             = VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT;
queueCreateInfo[0].queueFamilyIndex  = queueFamilyFound;
queueCreateInfo[0].queueCount        = 1;

queueCreateInfo[1].flags             = 0; // unprotected because the protected flag is not set
queueCreateInfo[1].queueFamilyIndex  = queueFamilyFound;
queueCreateInfo[1].queueCount        = 1;

VkDeviceCreateInfo deviceCreateInfo   = {};
deviceCreateInfo.pQueueCreateInfos    = queueCreateInfo;
deviceCreateInfo.queueCreateInfoCount = 2;
vkCreateDevice(physicalDevice, &deviceCreateInfo, nullptr, &deviceHandle);

Now instead of using `vkGetDeviceQueue` an application has to use `vkGetDeviceQueue2` in order to pass the `VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT` flag when getting the `VkQueue` handle.

VkDeviceQueueInfo2 info = {};
info.queueFamilyIndex = queueFamilyFound;
info.queueIndex       = 0;
info.flags            = VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT;
vkGetDeviceQueue2(deviceHandle, &info, &protectedQueue);

When creating a `VkImage` or `VkBuffer` to make them protected is as simple as setting `VK_IMAGE_CREATE_PROTECTED_BIT` and `VK_BUFFER_CREATE_PROTECTED_BIT` respectively.

When binding memory to the protected resource, the `VkDeviceMemory` must have been allocated from a `VkMemoryType` with the `VK_MEMORY_PROPERTY_PROTECTED_BIT` bit.

When creating a swapchain the `VK_SWAPCHAIN_CREATE_PROTECTED_BIT_KHR` bit is used to make a protected swapchain.

All `VkImage` from `vkGetSwapchainImagesKHR` using a protected swapchain are the same as if the image was created with `VK_IMAGE_CREATE_PROTECTED_BIT`.

Sometimes it is unknown whether swapchains can be created with the `VK_SWAPCHAIN_CREATE_PROTECTED_BIT_KHR` flag set. The [VK_KHR_surface_protected_capabilities](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_surface_protected_capabilities.html) extension is exposed on platforms where this might be unknown.

Using the protected `VkQueue`, an application can also use `VK_COMMAND_POOL_CREATE_PROTECTED_BIT` when creating a `VkCommandPool`

VkCommandPoolCreateInfo info = {};
info.flags            = VK_COMMAND_POOL_CREATE_PROTECTED_BIT;
info.queueFamilyIndex = queueFamilyFound; // protected queue
vkCreateCommandPool(deviceHandle, &info, nullptr, &protectedCommandPool);

All command buffers allocated from the protected command pool become “protected command buffers”

VkCommandBufferAllocateInfo info = {};
info.commandPool = protectedCommandPool;
vkAllocateCommandBuffers(deviceHandle, &info, &protectedCommandBuffers);

When submitting work to be protected, all the `VkCommandBuffer` submitted must also be protected.

VkProtectedSubmitInfo protectedSubmitInfo = {};
protectedSubmitInfo.protectedSubmit       = true;

VkSubmitInfo submitInfo                  = {};
submitInfo.pNext                         = &protectedSubmitInfo;
submitInfo.pCommandBuffers               = protectedCommandBuffers;

vkQueueSubmit(protectedQueue, 1, &submitInfo, fence));

or using [VK_KHR_synchronization2](extensions/VK_KHR_synchronization2.html#VK_KHR_synchronization2)

VkSubmitInfo2KHR submitInfo = {}
submitInfo.flags = VK_SUBMIT_PROTECTED_BIT_KHR;

vkQueueSubmit2KHR(protectedQueue, 1, submitInfo, fence);
