"use client"

import { useRef } from "react"
import PropTypes from 'prop-types'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Camera } from "lucide-react"

export default function EditProfileDialog({
  isOpen,
  onClose,
  firstName,
  lastName,
  avatarSrc,
  username,
  email,
  onAvatarChange,
  onFirstNameChange,
  onLastNameChange,
  onSubmit,
}) {
  const fileInputRef = useRef(null)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[580px] md:max-w-[540px] h-[auto] p-0 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 bg-[url('/assets/editprofile.png')] bg-cover bg-center relative">
          <div className="grid grid-cols-1 p-8 gap-10">
            {/* Profile Image Section */}
            <div className="grid place-items-center">
              <div className="relative">
                <Avatar className="h-28 w-28 border-4 border-white rounded-full">
                  <AvatarImage src={avatarSrc} alt="Profile" />
                  <AvatarFallback className="">
                    {firstName}
                    {lastName}
                  </AvatarFallback>
                </Avatar>
                <button
                  className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-500 text-white"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-5 w-5" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={onAvatarChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{username}</h3>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
            <div className="grid place-items-center w-full">
              <Card className="w-full max-w-lg bg-slate-50 rounded-lg border-none shadow-lg ">
                <CardHeader className="bg-[#EEF9FE] rounded-t-lg">
                  <CardTitle className="text-lg font-normal">Edit your information</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                  <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input id="firstName" value={firstName} onChange={onFirstNameChange} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input id="lastName" value={lastName} onChange={onLastNameChange} />
                      </div>
                    </div>
                    <DialogFooter className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" onOpenChange={onClose}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
                        Save changes
                      </Button>
                    </DialogFooter>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
