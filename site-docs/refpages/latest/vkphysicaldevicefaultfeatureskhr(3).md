# VkPhysicalDeviceFaultFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceFaultFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceFaultFeaturesKHR - Structure indicating support for device fault reporting

The `VkPhysicalDeviceFaultFeaturesKHR` structure is defined as:

// Provided by VK_KHR_device_fault
typedef struct VkPhysicalDeviceFaultFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           deviceFault;
    VkBool32           deviceFaultVendorBinary;
    VkBool32           deviceFaultReportMasked;
    VkBool32           deviceFaultDeviceLostOnMasked;
} VkPhysicalDeviceFaultFeaturesKHR;

This structure describes the following features:

* 
 `deviceFault` indicates that the
implementation supports the reporting of device fault information.

* 
 `deviceFaultVendorBinary`
indicates that the implementation supports the generation of
vendor-specific binary crash dumps.
These **may** provide additional information when imported into
vendor-specific external tools.

* 
 `deviceFaultReportMasked`
indicates that the implementation supports masked faults in normal
operation (ie.
automatically recovered by the driver internally without the application
receiving a [VK_ERROR_DEVICE_LOST](VkResult.html) error) which **may** be reported via
this extension even if they did not result in a
[VK_ERROR_DEVICE_LOST](VkResult.html) condition being returned to the application.

* 

`deviceFaultDeviceLostOnMasked` indicates that the implementation
supports returning [VK_ERROR_DEVICE_LOST](VkResult.html) for faults that would be
normally be masked.

In exceptional circumstances, some implementations **may** mask faults and
attempt to recover from an error.
In such circumstances, the device is not lost and further work can be
submitted to the device.
When such faults occur, the contents of all resources being written to at
the time of the fault are **undefined**.

If the `VkPhysicalDeviceFaultFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceFaultFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFaultFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceFaultFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FAULT_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_device_fault](VK_KHR_device_fault.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceFaultFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
