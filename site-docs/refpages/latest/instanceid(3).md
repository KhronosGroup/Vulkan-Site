# InstanceId(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/InstanceId.html

## Table of Contents

- [Name](#_name)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

InstanceId - Id associated with an intersected instance

`InstanceId`

Decorating a variable in an intersection, any-hit, or closest hit shader
with the `InstanceId` decoration will make that variable contain the
index of the instance that intersects the current ray.

Valid Usage

* 
[](#VUID-InstanceId-InstanceId-04254) VUID-InstanceId-InstanceId-04254

The `InstanceId` decoration **must** be used only within the
`IntersectionKHR`, `AnyHitKHR`, or `ClosestHitKHR`
`Execution` `Model`

* 
[](#VUID-InstanceId-InstanceId-04255) VUID-InstanceId-InstanceId-04255

The variable decorated with `InstanceId` **must** be declared using the
`Input` `Storage` `Class`

* 
[](#VUID-InstanceId-InstanceId-04256) VUID-InstanceId-InstanceId-04256

The variable decorated with `InstanceId` **must** be declared as a
scalar 32-bit integer value

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/index.html) (NOTE: cannot determine Specification page containing this refpage).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
