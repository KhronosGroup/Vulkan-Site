# DeviceIndex(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/DeviceIndex.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

DeviceIndex - Index of the device executing the shader

`DeviceIndex`

The `DeviceIndex` decoration **can** be applied to a shader input which will
be filled with the device index of the physical device that is executing the
current shader invocation.
This value will be in the range   ,
where physicalDeviceCount is the `physicalDeviceCount` member of
[VkDeviceGroupDeviceCreateInfo](VkDeviceGroupDeviceCreateInfo.html).

Valid Usage

* 
[](#VUID-DeviceIndex-DeviceIndex-04205) VUID-DeviceIndex-DeviceIndex-04205

The variable decorated with `DeviceIndex` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-DeviceIndex-DeviceIndex-04206) VUID-DeviceIndex-DeviceIndex-04206

The variable decorated with `DeviceIndex` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
