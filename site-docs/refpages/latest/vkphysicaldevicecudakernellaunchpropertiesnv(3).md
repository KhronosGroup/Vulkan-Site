# VkPhysicalDeviceCudaKernelLaunchPropertiesNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceCudaKernelLaunchPropertiesNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceCudaKernelLaunchPropertiesNV - Structure describing the compute capability version available

The `VkPhysicalDeviceCudaKernelLaunchPropertiesNV` structure is defined
as:

// Provided by VK_NV_cuda_kernel_launch
typedef struct VkPhysicalDeviceCudaKernelLaunchPropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           computeCapabilityMinor;
    uint32_t           computeCapabilityMajor;
} VkPhysicalDeviceCudaKernelLaunchPropertiesNV;

The members of the `VkPhysicalDeviceCudaKernelLaunchPropertiesNV`
structure describe the following features:

* 
 `computeCapabilityMinor` indicates
the minor version number of the compute code.

* 
 `computeCapabilityMajor` indicates
the major version number of the compute code.

If the `VkPhysicalDeviceCudaKernelLaunchPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCudaKernelLaunchPropertiesNV-sType-sType) VUID-VkPhysicalDeviceCudaKernelLaunchPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUDA_KERNEL_LAUNCH_PROPERTIES_NV](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_NV_cuda_kernel_launch](VK_NV_cuda_kernel_launch.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceCudaKernelLaunchPropertiesNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
