# vkGetMemoryFdKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetMemoryFdKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetMemoryFdKHR - Get a POSIX file descriptor for a memory object

To export a POSIX file descriptor referencing the payload of a Vulkan device
memory object, call:

// Provided by VK_KHR_external_memory_fd
VkResult vkGetMemoryFdKHR(
    VkDevice                                    device,
    const VkMemoryGetFdInfoKHR*                 pGetFdInfo,
    int*                                        pFd);

* 
`device` is the logical device that created the device memory being
exported.

* 
`pGetFdInfo` is a pointer to a [VkMemoryGetFdInfoKHR](VkMemoryGetFdInfoKHR.html) structure
containing parameters of the export operation.

* 
`pFd` will return a file descriptor referencing the payload of the
device memory object.

Each call to `vkGetMemoryFdKHR` **must** create a new file descriptor
holding a reference to the memory object’s payload and transfer ownership of
the file descriptor to the application.
To avoid leaking resources, the application **must** release ownership of the
file descriptor using the `close` system call when it is no longer
needed, or by importing a Vulkan memory object from it.
Where supported by the operating system, the implementation **must** set the
file descriptor to be closed automatically when an `execve` system call
is made.

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryFdKHR-device-parameter) VUID-vkGetMemoryFdKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetMemoryFdKHR-pGetFdInfo-parameter) VUID-vkGetMemoryFdKHR-pGetFdInfo-parameter

 `pGetFdInfo` **must** be a valid pointer to a valid [VkMemoryGetFdInfoKHR](VkMemoryGetFdInfoKHR.html) structure

* 
[](#VUID-vkGetMemoryFdKHR-pFd-parameter) VUID-vkGetMemoryFdKHR-pFd-parameter

 `pFd` **must** be a valid pointer to an `int` value

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_TOO_MANY_OBJECTS](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_external_memory_fd](VK_KHR_external_memory_fd.html), [VkDevice](VkDevice.html), [VkMemoryGetFdInfoKHR](VkMemoryGetFdInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkGetMemoryFdKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
