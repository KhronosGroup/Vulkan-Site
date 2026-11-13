# InstanceCustomIndexKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/InstanceCustomIndexKHR.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

InstanceCustomIndexKHR - Custom index associated with an intersected instance

`InstanceCustomIndexKHR`

A variable decorated with the `InstanceCustomIndexKHR` decoration will
contain the application-defined value of the instance that intersects the
current ray.
This variable contains the value that was specified in
[VkAccelerationStructureInstanceKHR](VkAccelerationStructureInstanceKHR.html)::`instanceCustomIndex` for the
current acceleration structure instance in the lower 24 bits and the upper 8
bits will be zero.

Valid Usage

* 
[](#VUID-InstanceCustomIndexKHR-InstanceCustomIndexKHR-04251) VUID-InstanceCustomIndexKHR-InstanceCustomIndexKHR-04251

The `InstanceCustomIndexKHR` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, or `ClosestHitKHR`
`Execution` `Model`

* 
[](#VUID-InstanceCustomIndexKHR-InstanceCustomIndexKHR-04252) VUID-InstanceCustomIndexKHR-InstanceCustomIndexKHR-04252

The variable decorated with `InstanceCustomIndexKHR` **must** be
declared using the `Input` `Storage` `Class`

* 
[](#VUID-InstanceCustomIndexKHR-InstanceCustomIndexKHR-04253) VUID-InstanceCustomIndexKHR-InstanceCustomIndexKHR-04253

The variable decorated with `InstanceCustomIndexKHR` **must** be
declared as a scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
